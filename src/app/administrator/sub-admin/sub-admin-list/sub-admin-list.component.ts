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
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SubAdmin } from 'src/app/_models/sub-admin';
import { SubAdminService } from 'src/app/_services/sub-admin.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-sub-admin-list',
  templateUrl: './sub-admin-list.component.html',
  styleUrls: ['./sub-admin-list.component.scss']
})
export class SubAdminListComponent implements OnInit, AfterViewInit, AfterViewChecked {
  assetUrl = environment.assetUrl;
  blocks = [];
  isLoading = false;
  displayedColumns: string[] = [];
  resultsLength = 0;
  subAdminTbl = new MatTableDataSource<SubAdmin>();
  emptyData = new MatTableDataSource([{ empty: "row" }]);
  //code by p
  page = 1;
  PageData :any;
  len : any  ;
  buttonDisabled = true ;
  form:FormGroup;
  limit:number= 10;
  offset:number=0;
  length:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private router: Router,
    private subAdminService: SubAdminService,
    private notify: NotificationService,
    private route: ActivatedRoute
  ) {
    this.displayedColumns = [
      'name',
      'email',
      'status',
      'action',
    ];
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      searchQuery:['',false],
      status: ['', false],
      sortOption: ['-1', false],
    });
    if(typeof this.route.snapshot.queryParamMap.get('searchQuery') == 'string') {
      this.form.patchValue({searchQuery:this.route.snapshot.queryParamMap.get('searchQuery')});
    }
    if(typeof this.route.snapshot.queryParamMap.get('status') == 'string') {
      this.form.patchValue({status:this.route.snapshot.queryParamMap.get('status')});
    }
    // this.subAdminTbl.paginator = this.paginator;
    // this.paginator.page.subscribe((response: any) => {
    //   this.paginator.pageIndex = response.pageIndex;
    //   this.paginator.pageSize = response.pageSize;
    //   this.populateTable();
    // });
    this.subAdminTbl.sort = this.sort;
  } 
  filterTable(){
    this.router.navigate(['dashboard/sub-admin-list'], { queryParams: this.form.value});
    this.populateTable(this.form.value);
  }
  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }
  populateTable(obj): void {
    this.isLoading = true;
    var data={
      limit:obj.limit,
      offset:obj.offset,
      formvalue:this.form.value
    }
    this.subAdminService
      .getSubAdminTblDetailsfilter(data)
      .subscribe(
        (result) => {
          this.subAdminTbl.data=result.getSubAdminTblDetails;
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
  addSubAdmin(): void {
    this.router.navigate(['dashboard','sub-admin-edit', 1]);
  }
  editSubAdmin(_id : string): void {
    this.router.navigate(['dashboard','sub-admin-edit', _id]);
  }
   // code by p
   nextPage(){
    const pageNumber =this.page+1 ;
    this.subAdminService.postNextPairsPage(pageNumber).subscribe((result)=>{
      this.PageData = result
      this.subAdminTbl.data = this.PageData.getSubAdminTblDetails ;
      this.len = this.PageData.getSubAdminTblDetails.length;
        this.buttonDisabled = false
     
      this.page++

    })
  }
  backpage(){
    if (this.page > 1){
    const pageNumber = this.page -1 ;
    this.subAdminService.postNextPairsPage(pageNumber).subscribe((result)=>{
      this.PageData = result
      this.subAdminTbl.data = this.PageData.getSubAdminTblDetails ;
      this.len = this.PageData.getSubAdminTblDetails.length;
        // this.buttonDisabled = false
      this.page--
    })
  }
  else{
    this.buttonDisabled = true ;
  }
  }
  compareItems(i1, i2) {
    return i1==i2;
  }
  refresh(){
    this.form = this.fb.group({
      searchQuery:['',false],
      status: ['', false],
      sortOption: ['-1', false]
    });
    this.paginator.firstPage();

    this.populateTable(this.form.value);
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
  ExportToCsv(){
    
    if(this.subAdminTbl.data.length>0){
      let data = [];
      this.subAdminTbl.data.forEach((element: any) => {
        data.push({
          'Admin Name' : element.name ,
          'Email' : element.email,
          'Status' : element.status == 1 ? 'Active' : 'De-Active'
        })
      }) 
    
     const options = { 
      fieldSeparator: ',',
      filename: 'sub-admin',
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
}