import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router,ActivatedRoute} from '@angular/router';
import { environment } from 'src/environments/environment';
import { P2PPairs } from 'src/app/_models/p2p-pairs';
import { CurrencyService } from 'src/app/_services/currency.service';
import { P2PService } from 'src/app/_services/p2p.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { P2PPairsFormComponent } from '../p2p-pairs-form/p2p-pairs-form.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-p2p-pairs-list',
  templateUrl: './p2p-pairs-list.component.html',
  styleUrls: ['./p2p-pairs-list.component.scss']
})
export class P2PPairsListComponent implements OnInit, AfterViewInit, AfterViewChecked {
  form:FormGroup;
  assetUrl = environment.assetUrl;
  currency = [];
  isLoading = false;
  displayedColumns: string[] = [];
  resultsLength = 0;
  pairsTbl = new MatTableDataSource<P2PPairs>();
  emptyData = new MatTableDataSource([{ empty: "row" }]);
   //code by p
   page = 1;
   PageData :any;
   len : any  ;
   buttonDisabled = true ;
   limit:number= 10;
   offset:number=0;
   length:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private router: Router,
    private currencyService: CurrencyService,
    private p2pService: P2PService,
    private notify: NotificationService,
    private dialog: MatDialog,
    private route: ActivatedRoute

  ) {
    this.displayedColumns = [
      'pair',
      'status',
      'action',
    ];
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      pair:['',false],
      status: ['', false],
    });
    if(typeof this.route.snapshot.queryParamMap.get('pair') == 'string') {
      this.form.patchValue({pair:this.route.snapshot.queryParamMap.get('pair')});
    }
    if(typeof this.route.snapshot.queryParamMap.get('status') == 'string') {
      this.form.patchValue({status:this.route.snapshot.queryParamMap.get('status')});
    }
    this.populateTable(this.form.value);
    this.pairsTbl.sort = this.sort;
  } 
  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }
  compareItems(i1, i2) {
    return i1==i2;
  }
  filterTable(){
    this.router.navigate(['dashboard/p2p-pairs-list'], { queryParams: this.form.value});
    this.populateTable(this.form.value);
  }
  populateTable(obj): void {
    this.isLoading = true;
    this.currencyService
      .getCurrencyTblDetails()
      .subscribe(
        (result) => {
          this.currency = result.getCurrencyTblDetails;
        },
        (err) => {
          this.notify.showSystemError(err);
        }
      );
    var data={
      limit:obj.limit,
      offset:obj.offset,
      formvalue:this.form.value
    }
    this.p2pService
      .getP2PPairsTblDetailsfilter(data)
      .subscribe(
        (result) => {
          this.pairsTbl.data=result.getp2ppairsDetails;
          this.length=result.total;
          this.isLoading = false;
        },
        (err) => {
          this.notify.showSystemError(err);
        }
      );
  }
  ngAfterViewInit(): void {
    this.populateTable(this.form.value);
  }
  addPairs(): void {
    const dialogRef = this.dialog.open(P2PPairsFormComponent, {
      width: '500px',
      height: '630px',
      data: {editData: '', currency: this.currency}
    });
    dialogRef.afterClosed().subscribe (res =>{
      if(res.data.status){
        this.populateTable(this.form.value);
       }
    })
  }
  editPair(_id : string): void {
    const i = this.pairsTbl.data.findIndex(function(object: any) {
        return object._id === _id;
    });
    let a = this.pairsTbl.data[i]
    const dialogRef = this.dialog.open(P2PPairsFormComponent, {
      width: '500px',
      height: '630px',
      data: {editData: a, currency: this.currency}
    });
    dialogRef.afterClosed().subscribe (res =>{
      if(res.data.status){
       this.populateTable(this.form.value);
      }
    })
  }
  // code by p
  nextPage(){
    const pageNumber =this.page+1 ;
    this.currencyService.postNextPairsPage(pageNumber).subscribe((result)=>{
    this.PageData = result
    this.pairsTbl.data = this.PageData.getp2ppairsDetails ;
    this.len = this.PageData.getp2ppairsDetails.length;
    this.buttonDisabled = false
    this.page++
    })
  }
  backpage(){
    if (this.page > 1){
    const pageNumber = this.page -1 ;
    this.currencyService.postNextPairsPage(pageNumber).subscribe((result)=>{
      this.PageData = result
      this.pairsTbl.data = this.PageData.getp2ppairsDetails ;
      this.len = this.PageData.getp2ppairsDetails.length;
      this.page--
    })
    } else{
      this.buttonDisabled = true ;
    }
  }
  refresh(){
    this.form = this.fb.group({
      marketprice: ['',false],
      status: ['', false],
      pair: ['',false]
    }); 
    this.paginator.firstPage();
    this.populateTable(this.form.value );
  }
  ExportToCsv(){
    if(this.pairsTbl.data.length>0){
      let data = [];
      this.pairsTbl.data.forEach((element: any) => {
        try {
          data.push({
            'Pair Name' : element.pair ,
            'Minimum Trade' : element.minTrade ,
            'Maximum Trade' : element.maxTrade ,
            'Status' : element.status == 1 ? 'Active' : 'De-Active',
          })
        } catch(e) {
          console.log('ExportToCsv',e)
        }
      })
      const options = { 
        fieldSeparator: ',',
        filename: 'P2P-Pairs-list',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true, 
        showTitle: false,
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
      };
      const csvExporter = new ExportToCsv(options);
      csvExporter.generateCsv(data);
    }
  }
  changepage(event){
    if(event.pageSize!=this.limit){
      var obj1={
          offset:event.pageSize*event.pageIndex,
          limit:event.pageSize
      }
      this.populateTable(obj1)
    }
    else{
      var obj={
        offset:event.pageIndex * this.limit,
        limit:this.limit
      }
      this.populateTable(obj)
    }
  }
}