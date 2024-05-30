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
  import { P2PReport } from 'src/app/_models/p2p-report';
  import { NotificationService } from 'src/app/_services/core/notification.service';
  import { FormBuilder, FormGroup } from '@angular/forms';
  import { DatePipe } from '@angular/common';
  import { P2PService } from 'src/app/_services/p2pTransactionHistory.service';
  import { ExportToCsv } from 'export-to-csv';
  @Component({
    selector: 'app-p2p-report-list',
    templateUrl: './p2p-report-list.component.html',
    styleUrls: ['./p2p-report-list.component.scss']
  })
  export class P2PReportListComponent implements OnInit, AfterViewInit, AfterViewChecked {
    form: FormGroup;
    assetUrl = environment.assetUrl;
    blocks = [];
    currencies = [];
    isLoading = false;
    displayedColumns: string[] = [];
    p2preportTbl = new MatTableDataSource<P2PReport>();
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
        'orderNo',
        'action'
      ];
    }
    ngOnInit(): void {
      this.form = this.fb.group({
        fromdate: ['',false],
        todate: ['',false]
      });
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
      this.p2preportTbl.sort = this.sort;
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
      this.p2pService.getp2pReportTblApiResponse(data).subscribe((res: any) => {
        if (res.status) {
          this.p2preportTbl.data = res.data;
          this.isLoading = false;
          this.length = res.total;
        } else {
          this.p2preportTbl.data = [];
          this.isLoading = false;
          this.length = res.total;
        }
      },(err) => {
        this.notify.showSystemError(err);
      });
      this.isLoading = true;
    }
    ngAfterViewInit(): void {

    }
    viewReport(_id: string): void {
      this.router.navigate(['dashboard', 'p2p-report-details', _id]);
    }
    ExportToCsv() {
      if(this.p2preportTbl.data.length>0){
        let data = [];
      this.p2preportTbl.data.forEach((element: any) => {
        data.push({
          'Created Date': this.datepipe.transform(element.createdDate ,'MMM dd, y, HH:mm:ss'),
          'User Email': element.email,
          'Advertiser Email': element.advertiserDet.email,
          'orderNo': element.orderNo,
        })
      })
      const options = {
        fieldSeparator: ',',
        filename: 'reports',
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
    refresh(){
      this.form = this.fb.group({
        fromdate: ['',false],
        todate: ['',false]
      });  
      this.paginator.firstPage();
      this.populateTable(this.form.value);
    }
    filterTable(){
      this.router.navigate(['dashboard/p2p-report'], { queryParams: this.form.value});
      this.populateTable(this.form.value);
    }
    compareItems(i1, i2) {
      return i1==i2;
    }
  }