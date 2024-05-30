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
import { EmailTemplateAPIService } from 'src/app/_services/emailtemplate.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExportToCsv } from 'export-to-csv';
import { EmailTemplateFormComponent } from '../email-template-form/email-template-form.component';

@Component({
  selector: 'app-email-template-list',
  templateUrl: './email-template-list.component.html',
  styleUrls: ['./email-template-list.component.scss']
})
export class EmailTemplateListComponent implements OnInit, AfterViewInit, AfterViewChecked {
  form:FormGroup;
  assetUrl = environment.assetUrl;
  currency = [];
  isLoading = false;
  displayedColumns: string[] = [];
  resultsLength = 0;
  icon: File;
  emailTemplateTbl = new MatTableDataSource<Cms>();
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
    private emailtemplateService: EmailTemplateAPIService,
    private notify: NotificationService,
    private dialog: MatDialog,
    private route: ActivatedRoute

  ) {
    this.displayedColumns = [
      'subject',
      'content',
      'status',
      'action',
    ];
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      searchQuery: ['', false],
      subject: ['', false],
      content:['',false],
      status: ['', false],
    });
    if(typeof this.route.snapshot.queryParamMap.get('searchQuery') == 'string') {
      this.form.patchValue({searchQuery:this.route.snapshot.queryParamMap.get('searchQuery')});
    }
    if(typeof this.route.snapshot.queryParamMap.get('subject') == 'string') {
      this.form.patchValue({marketprice:this.route.snapshot.queryParamMap.get('subject')});
    }
    if(typeof this.route.snapshot.queryParamMap.get('description') == 'string') {
      this.form.patchValue({marketprice:this.route.snapshot.queryParamMap.get('description')});
    }
    if(typeof this.route.snapshot.queryParamMap.get('status') == 'string') {
      this.form.patchValue({status:this.route.snapshot.queryParamMap.get('status')});
    }
    this.populateTable(this.form.value);
    this.emailTemplateTbl.sort = this.sort;
  } 
  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }
  compareItems(i1, i2) {
    return i1==i2;
  }
  filterTable(){
    this.router.navigate(['dashboard/email-template'], { queryParams: this.form.value});
    this.populateTable(this.form.value);
  }
  populateTable(obj): void {
    this.isLoading = true;
    var data={
      limit:obj.limit,
      offset:obj.offset,
      formvalue:this.form.value
    }
    this.emailtemplateService
      .getEmailTemplateTblDetails(data)
      .subscribe(
        (result) => {
          this.emailTemplateTbl.data=result.getemailtemplateDetails;
          this.length = result.total;
          this.isLoading = false;
        },
        (err) => {
          this.notify.showSystemError(err);
        }
      );
  }
  addEmailTemplate(): void {
    const dialogRef = this.dialog.open(EmailTemplateFormComponent, {
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
  editEmailTemplate(_id : string): void {
    const i = this.emailTemplateTbl.data.findIndex(function(object: any) {
        return object._id === _id;
    });
    let a = this.emailTemplateTbl.data[i]
    const dialogRef = this.dialog.open(EmailTemplateFormComponent, {
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
      searchQuery: ['',false],
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