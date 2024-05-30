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
  import { Router, ActivatedRoute } from '@angular/router';
  import { environment } from 'src/environments/environment';
  import { P2PBlockedUsers } from 'src/app/_models/p2p-blocked-users';
  import { NotificationService } from 'src/app/_services/core/notification.service';
  import { FormBuilder, FormGroup } from '@angular/forms';
  import { DatePipe } from '@angular/common';
  import { P2PService } from 'src/app/_services/p2pTransactionHistory.service';
  import { ExportToCsv } from 'export-to-csv';
  @Component({
    selector: 'app-blocked-users-list',
    templateUrl: './p2p-blocked-users-list.component.html',
    styleUrls: ['./p2p-blocked-users-list.component.scss']
  })
  export class P2PBlockedUsersListComponent implements OnInit, AfterViewInit, AfterViewChecked {
    form: FormGroup;
    assetUrl = environment.assetUrl;
    blocks = [];
    currencies = [];
    isLoading = false;
    displayedColumns: string[] = [];
    p2pblockedUsersTbl = new MatTableDataSource<P2PBlockedUsers>();
    emptyData = new MatTableDataSource([{ empty: "row" }]);
    page = 1;
    PageData: any;
    len: any;
    buttonDisabled = true;
    limit:number= 10;
    offset:number=0;
    length:any;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort!: MatSort;
  
    constructor(
      private fb: FormBuilder,
      private ref: ChangeDetectorRef,
      private router: Router,
      private notify: NotificationService,
      private route: ActivatedRoute,
      public datepipe: DatePipe,
      private p2pService: P2PService,
    ) {
      this.displayedColumns = [
        'createdDate',
        'Email',
        'AdvertisorEmail',
        'reason',
        'status'
      ];
    }
    ngOnInit(): void {
      this.form = this.fb.group({
        status: ['', false],
        fromdate: ['',false],
        todate: ['',false]
      });
      if(typeof this.route.snapshot.queryParamMap.get('status') == 'string') {
        this.form.patchValue({status:this.route.snapshot.queryParamMap.get('status')});
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
      this.populateTable(this.form.value);
      this.p2pblockedUsersTbl.sort = this.sort;
    }
    blockUnblock(row:any){
      this.p2pService.blockUnlockUser({row}).subscribe((result) => {
        if (result.status) {
          this.notify.showSuccess(result.message);
          this.isLoading = false;
          this.ngOnInit();
        } else {
          this.notify.showError(result.message);
        }
      }, (err) => {
        this.notify.showSystemError(err);
      })
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
       this.p2pService.getp2pBlockedUserTblApiResponse(data).subscribe((res: any) => {
        if (res.status) {
          this.p2pblockedUsersTbl.data = res.data;
          this.isLoading = false;
          this.length = res.total;
        } else {
          this.p2pblockedUsersTbl.data = [];
          this.isLoading = false;
          this.length = res.total;
        }
      },(err) => {
        this.notify.showSystemError(err);
      });
      this.isLoading = true;
    }
    compareItems(i1, i2) {
      return i1==i2;
    }
    refresh(){
      this.form = this.fb.group({
        fromdate: ['',false],
        status: ['', false],
        todate: ['',false]
      }); 
      this.paginator.firstPage();
      this.populateTable(this.form.value );
    }
    ExportToCsv() {
      if(this.p2pblockedUsersTbl.data.length>0){
        let data = [];
      this.p2pblockedUsersTbl.data.forEach((element: any) => {
        data.push({
          'Blocked Date' : this.datepipe.transform(element.createdDate ,'MMM dd, y, HH:mm:ss'),
          'Blocker User Email' : element.blockerUserDet.email,
          'Blocked User Email' : element.blockedUserDet.email,
          'Reason' : element.reason,
          'Status' : element.status == 1 ? 'UnBlocked' : 'Blocked'
        })
      })
      const options = { 
        fieldSeparator: ',',
        filename: 'Blocked Users',
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
    ngAfterViewInit(): void {

    }
    filterTable(): void {
      this.router.navigate(['dashboard/p2p-blocked-users'], { queryParams: this.form.value});
      this.populateTable(this.form.value);
    }
    viewReport(_id: string): void {
      // this.router.navigate(['dashboard', 'p2p-blocked-users-details', _id]);
    }

  }