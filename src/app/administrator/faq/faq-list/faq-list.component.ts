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
import { P2PFaq } from 'src/app/_models/p2p-faq';
import { CurrencyService } from 'src/app/_services/currency.service';
import { P2PService } from 'src/app/_services/p2p.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExportToCsv } from 'export-to-csv';
import { FAQFormComponent } from '../faq-form/faq-form.component';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss']
})
export class FAQListComponent implements OnInit, AfterViewInit, AfterViewChecked {
  form:FormGroup;
  assetUrl = environment.assetUrl;
  currency = [];
  isLoading = false;
  displayedColumns: string[] = [];
  resultsLength = 0;
  faqTbl = new MatTableDataSource<P2PFaq>();
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
      'title',
      'description',
      'type',
      // 'status',
      'action',
    ];
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      title:['',false],
      description: ['', false],
      type: ['', false],
      status: ['', false],
    });
    if(typeof this.route.snapshot.queryParamMap.get('title') == 'string') {
      this.form.patchValue({marketprice:this.route.snapshot.queryParamMap.get('title')});
    }
    if(typeof this.route.snapshot.queryParamMap.get('description') == 'string') {
      this.form.patchValue({marketprice:this.route.snapshot.queryParamMap.get('description')});
    }
    if(typeof this.route.snapshot.queryParamMap.get('type') == 'string') {
      this.form.patchValue({marketprice:this.route.snapshot.queryParamMap.get('type')});
    }
    if(typeof this.route.snapshot.queryParamMap.get('status') == 'string') {
      this.form.patchValue({status:this.route.snapshot.queryParamMap.get('status')});
    }
    this.populateTable(this.form.value);
    this.faqTbl.sort = this.sort;
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
    var data={
      limit:obj.limit,
      offset:obj.offset,
      formvalue:this.form.value
    }
    this.p2pService
    .getP2PFaqTblDetailsfilter(data)
    .subscribe(
      (result) => {
        this.faqTbl.data=result.getp2ppairsDetails;
        this.length=result.total;
        this.isLoading = false;
      },
      (err) => {
        this.notify.showSystemError(err);
      }
      );
  }
  addFaq(): void {
    const dialogRef = this.dialog.open(FAQFormComponent, {
      width: '500px',
      height: '630px',
      data: {editData: '', currency: ''}
    });
    dialogRef.afterClosed().subscribe (res =>{
      if(res.data.status){
        // this.populateTable(this.form.value);
       }
    })
  }
  editFaq(_id : string): void {
    const i = this.faqTbl.data.findIndex(function(object: any) {
        return object._id === _id;
    });
    let a = this.faqTbl.data[i]
    const dialogRef = this.dialog.open(FAQFormComponent, {
      width: '500px',
      height: '630px',
      data: {editData: a, currency: ''}
    });
    dialogRef.afterClosed().subscribe (res =>{
      if(res.data.status){
       this.populateTable(this.form.value);
      }
    })
  }
  ngAfterViewInit(): void {
    this.populateTable(this.form.value);
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