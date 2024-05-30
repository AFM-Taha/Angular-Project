import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SubAdmin } from 'src/app/_models/sub-admin';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SubAdminService } from 'src/app/_services/sub-admin.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { ExportToCsv } from 'export-to-csv';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-Balance-Set-View-Component',
  templateUrl: './user-Balance-Set-View.component.html',
  styleUrls: ['./user-Balance-Set-View.component.scss']
})
export class UserBalanceSetViewComponent implements OnInit {
  form:FormGroup;
  assetUrl = environment.assetUrl;
  blocks = [];
  isLoading = false;
  displayedColumns: string[] = [];
  ActivityTbl = new MatTableDataSource<SubAdmin>();
  emptyData = new MatTableDataSource([{ empty: "row" }]);
  //code by p
  page = 1;
  PageData: any;
  len: any;
  buttonDisabled = true;
  limit:number= 10;
  offset:number=0;
  length:any;
  queryparams:any;
  title = 'Angular Paginator';
  currentPage = 1;
  itemsPerPage = 15;
  maxSize = 5;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private router: Router,
    private subadmin: SubAdminService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    public datepipe: DatePipe


  ) {
    this.displayedColumns = [
"dateTime",
"email",
"walletType",
"amount",
"oldBalance",
"newBalance",
"currencySymbol",
"name",
"reason",
    ];
  }

  
  ngOnInit(): void {
    this.form = this.fb.group({
      type: ['', false],
      fromdate:['',false],
      todate:['',false],
      searchQuery:['',false],
      sortOption: ['-1', false]
    });
    
    if(typeof this.route.snapshot.queryParamMap.get('type') == 'string') {
      this.form.patchValue({type:this.route.snapshot.queryParamMap.get('type')});
    }
    if(typeof this.route.snapshot.queryParamMap.get('searchQuery') == 'string') {
      this.form.patchValue({searchQuery:this.route.snapshot.queryParamMap.get('searchQuery')});
    }
    if(this.route.snapshot.queryParamMap.get('fromdate') !=''){
      if(typeof this.route.snapshot.queryParamMap.get('fromdate') == 'string') {
        this.form.patchValue({fromdate:new Date(this.route.snapshot.queryParamMap.get('fromdate'))});
      }
    }
    if(this.route.snapshot.queryParamMap.get('todate') !=''){
      if(typeof this.route.snapshot.queryParamMap.get('todate') == 'string') {
        this.form.patchValue({todate:new Date(this.route.snapshot.queryParamMap.get('todate'))});
      }
    }
    // });
    // var obj={
    //   limit:10,
    //   offset:0,
    //   formvalue:this.form
    // }
    this.ActivityTbl.sort = this.sort;
    this.populateTable(this.form);

  }
  filterTable(): void {
    this.router.navigate(['dashboard/user-Balance-Set-View'],{ queryParams: this.form.value});
    this.populateTable(this.form.value);
  }
  compareItems(i1, i2) {
    return i1==i2;
  }
  ExportToCsv() {
    if(this.ActivityTbl.data.length >0){
      let data = [];
    this.ActivityTbl.data.forEach((element: any) => {
      try {
        data.push({
          'DateTime':this.datepipe.transform(element.dateTime ,'MMM dd, y, HH:mm:ss'),
          'email': element.adminId.email,
          'walletType': element.walletType,
          'oldBalance': element.oldBalance,
          'amount': element.amount ,
          'newBalance': element.newBalance,
          'currencySymbol':element.currencySymbol,
          'Admin Name': element.name,
          'reason': element.reason,

        })
      } catch (e) {

      }
    })
    const options = {
      fieldSeparator: ',',
      filename: 'Balance-Update',
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
  populateTable(obj): void {
    this.isLoading = true;
    var data={
      limit:obj.limit,
      offset:obj.offset,
      formvalue:this.form.value
    }
    this.subadmin
      .getUserBalanceSetView(data)
      .subscribe(
        (result) => {
          this.ActivityTbl.data = result.BalanceSetTblDetails;
          console.log(result.BalanceSetTblDetails);
          console.log(result.total);
          this.length=result.total;
          this.isLoading = false;
        },
        (err) => {
          this.notify.showSystemError(err);
        }
      );
  }
  // code by p
  nextPage() {
    const pageNumber = this.page + 1;
    this.subadmin.postAdminPage(pageNumber).subscribe((result) => {
      this.PageData = result
      this.ActivityTbl.data = this.PageData.BalanceSetTblDetails;
      this.len = this.PageData.BalanceSetTblDetails.length;
      this.buttonDisabled = false
      this.page++
    })
  }
  backpage() {
    if (this.page > 1) {
      const pageNumber = this.page - 1;
      this.subadmin.postAdminPage(pageNumber).subscribe((result) => {
        this.PageData = result;
        this.ActivityTbl.data = this.PageData.BalanceSetTblDetails;
        this.len = this.PageData.BalanceSetTblDetails.length;
        this.page--
      })
    } else { this.buttonDisabled = true; }
  }
  refresh(){
    this.form = this.fb.group({
      type: ['', false],
      datevalue:['',false],
      searchQuery:['',false],
      sortOption: ['-1', false],
      fromdate:['',false],
      todate:['',false]
    });
    this.paginator.firstPage();
    this.populateTable(this.form.value)
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