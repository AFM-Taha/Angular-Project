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
import { Cms } from 'src/app/_models/cms';
import { CurrencyService } from 'src/app/_services/currency.service';
import { CMSService } from 'src/app/_services/cms.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExportToCsv } from 'export-to-csv';
import { CMSFormComponent } from '../cms-form/cms-form.component';

@Component({
  selector: 'app-cms-list',
  templateUrl: './cms-list.component.html',
  styleUrls: ['./cms-list.component.scss']
})
export class CMSListComponent implements OnInit, AfterViewInit, AfterViewChecked {
  form:FormGroup;
  assetUrl = environment.assetUrl;
  currency = [];
  isLoading = false;
  displayedColumns: string[] = [];
  resultsLength = 0;
  icon: File;
  cmsTbl = new MatTableDataSource<Cms>();
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
    private cmsService: CMSService,
    private notify: NotificationService,
    private dialog: MatDialog,
    private route: ActivatedRoute

  ) {
    this.displayedColumns = [
      'title',
      'description',
      'status',
      'action',
    ];
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: ['', false],
      pair:['',false],
      status: ['', false],
    });
    if(typeof this.route.snapshot.queryParamMap.get('title') == 'string') {
      this.form.patchValue({marketprice:this.route.snapshot.queryParamMap.get('title')});
    }
    if(typeof this.route.snapshot.queryParamMap.get('description') == 'string') {
      this.form.patchValue({marketprice:this.route.snapshot.queryParamMap.get('description')});
    }
    if(typeof this.route.snapshot.queryParamMap.get('status') == 'string') {
      this.form.patchValue({status:this.route.snapshot.queryParamMap.get('status')});
    }
    this.populateTable(this.form.value);
    this.cmsTbl.sort = this.sort;
  } 
  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }
  compareItems(i1, i2) {
    return i1==i2;
  }
  filterTable(){
    this.router.navigate(['dashboard/cms-list'], { queryParams: this.form.value});
    this.populateTable(this.form.value);
  }
  populateTable(obj): void {
    this.isLoading = true;
    var data={
      limit:obj.limit,
      offset:obj.offset,
      formvalue:this.form.value
    }
    let tablerow = [{
      "createdDate": "2022-10-19T10:42:09.987Z",
      "description" : "First, browse Buy Ads for the crypto you wish and sell, and find the best offers with your preferred payment method. You can read the reviews and check the requirements from the buyer. If they are agreeable for you, start the trade, and do not release the crypto until you have received the money in the payment method you provided.",
      "status": 1,
      "title": "How to add new payment Methods on Unitec P2P",
      "image": "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png",
      "_id": "6352217b3fffc2ce04216af8"
    }];
    this.cmsTbl.data=tablerow;
    this.cmsService
      .getCmsTblDetailsfilter(data)
      .subscribe(
        (result) => {
          this.cmsTbl.data=tablerow;
          this.length=1;
          this.isLoading = false;
        },
        (err) => {
          this.notify.showSystemError(err);
        }
      );
  }
  addCms(): void {
    const dialogRef = this.dialog.open(CMSFormComponent, {
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
  editCms(_id : string): void {
    const i = this.cmsTbl.data.findIndex(function(object: any) {
        return object._id === _id;
    });
    let a = this.cmsTbl.data[i]
    const dialogRef = this.dialog.open(CMSFormComponent, {
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