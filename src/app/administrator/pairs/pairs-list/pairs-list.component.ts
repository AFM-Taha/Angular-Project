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
import { Pairs } from 'src/app/_models/pairs';
import { CurrencyService } from 'src/app/_services/currency.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { PairsFormComponent } from '../pairs-form/pairs-form.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-pairs-list',
  templateUrl: './pairs-list.component.html',
  styleUrls: ['./pairs-list.component.scss']
})
export class PairsListComponent implements OnInit, AfterViewInit, AfterViewChecked {
  form:FormGroup;
  assetUrl = environment.assetUrl;
  currency = [];
  isLoading = false;
  displayedColumns: string[] = [];
  resultsLength = 0;
  pairsTbl = new MatTableDataSource<Pairs>();
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
    private notify: NotificationService,
    private dialog: MatDialog,
    private route: ActivatedRoute

  ) {
    this.displayedColumns = [
      'pair',
      'marketPrice',
      'status',
      'autoOrderExecute',
      'autoTradeOrder',
      'action',
    ];
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      marketprice: ['', false],
      pair:['',false],
      status: ['', false],
      autoOrderExecute:['',false],
      autoTradeOrder:['',false],
      sortOption: ['-1', false]
    });
    if(typeof this.route.snapshot.queryParamMap.get('marketprice') == 'string') {
      this.form.patchValue({marketprice:this.route.snapshot.queryParamMap.get('marketprice')});
    }
    if(typeof this.route.snapshot.queryParamMap.get('pair') == 'string') {
      this.form.patchValue({pair:this.route.snapshot.queryParamMap.get('pair')});
    }
    if(typeof this.route.snapshot.queryParamMap.get('status') == 'string') {
      this.form.patchValue({status:this.route.snapshot.queryParamMap.get('status')});
    }
    if(typeof this.route.snapshot.queryParamMap.get('autoOrderExecute') == 'string') {
      this.form.patchValue({autoOrderExecute:this.route.snapshot.queryParamMap.get('autoOrderExecute')});
    }
    // this.pairsTbl.paginator = this.paginator;
    // this.paginator.page.subscribe((response: any) => {
    //   this.paginator.pageIndex = response.pageIndex;
    //   this.paginator.pageSize = response.pageSize;
    //   // console.log(response.pageSize,"this is the page size of the pairs list")

    //   this.populateTable();
    // });
    this.pairsTbl.sort = this.sort;
  } 
  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }
  compareItems(i1, i2) {
    return i1==i2;
  }
  filterTable(){
    this.router.navigate(['dashboard/pairs-list'], { queryParams: this.form.value});
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
    this.currencyService
      .getPairsTblDetailsfilter(data)
      .subscribe(
        (result) => {
          this.pairsTbl.data=result.getPairsTblDetails;
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
    const dialogRef = this.dialog.open(PairsFormComponent, {
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
    const dialogRef = this.dialog.open(PairsFormComponent, {
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
        this.pairsTbl.data = this.PageData.getPairsTblDetails ;
        this.len = this.PageData.getPairsTblDetails.length;
          this.buttonDisabled = false
       
        this.page++

      })
    }
    backpage(){
      if (this.page > 1){
      const pageNumber = this.page -1 ;
      this.currencyService.postNextPairsPage(pageNumber).subscribe((result)=>{
        this.PageData = result
        this.pairsTbl.data = this.PageData.getPairsTblDetails ;
        this.len = this.PageData.getPairsTblDetails.length;
          // this.buttonDisabled = false
      

        console.log(this.len,"this is the response of page data ")
        console.log(this.pairsTbl )
        this.page--
      })
    }
    else{
      this.buttonDisabled = true ;
    }
    }
    refresh(){
      this.form = this.fb.group({
        marketprice: ['', false],
        pair:['',false],
        status: ['', false],
        autoOrderExecute:['',false],
        sortOption: ['-1', false]
      });  
      this.paginator.firstPage();

      this.populateTable(this.form.value);
    }
    ExportToCsv(){
      if(this.pairsTbl.data.length>0){
        let data = [];
        this.pairsTbl.data.forEach((element: any) => {
          try {
            data.push({
              'Pair Name' : element.pair ,
              'Market price' : element.marketPrice,
              'Status' : element.status == 1 ? 'Active' : 'De-Active',
              'Trading Status' : element.autoOrderExecute == 1 ? 'Active' : 'De-Active'
            })
          } catch(e) {
            console.log('ExportToCsv',e)
          }
        })
        const options = { 
          fieldSeparator: ',',
          filename: 'Pairs-list',
          quoteStrings: '"',
          decimalSeparator: '.',
          showLabels: true, 
          showTitle: false,
          useTextFile: false,
          useBom: true,
          useKeysAsHeaders: true,
          //headers: ['Name', 'Age', 'Average', 'Approved', 'Description'] // <-- Won't work with useKeysAsHeaders present!
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