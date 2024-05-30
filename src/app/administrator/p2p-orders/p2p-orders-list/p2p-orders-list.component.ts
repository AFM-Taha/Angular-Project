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
  import { P2PTransactionHistory } from 'src/app/_models/p2p-transactiono-history';
  import { NotificationService } from 'src/app/_services/core/notification.service';
  import { FormBuilder, FormGroup } from '@angular/forms';
  import { DatePipe } from '@angular/common';
  import { P2PService } from 'src/app/_services/p2pTransactionHistory.service';
  import { ExportToCsv } from 'export-to-csv';
  @Component({
    selector: 'app-p2p-orders-list',
    templateUrl: './p2p-orders-list.component.html',
    styleUrls: ['./p2p-orders-list.component.scss']
  })
  export class P2POrderListComponent implements OnInit, AfterViewInit, AfterViewChecked {
    form: FormGroup;
    assetUrl = environment.assetUrl;
    blocks = [];
    pairList = [];
    currencies = [];
    isLoading = false;
    page = 1;
    PageData: any;
    len: any;
    buttonDisabled = true;
    displayedColumns: string[] = [];
    p2pordersTbl = new MatTableDataSource<P2PTransactionHistory>();
    emptyData = new MatTableDataSource([{ empty: "row" }]);
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
        'username',
        'email',
        'pairName',
        'paymentNames',
        'orderType',
        'price',
        'status',
        'action'
      ];
    }
    ngOnInit(): void {
      this.form = this.fb.group({
        type: ['', false],
        orderType: ['', false],
        pair: ['', false],
        status: ['', false],
        fromdate: ['',false],
        todate: ['',false]
      });
    
      if(typeof this.route.snapshot.queryParamMap.get('type') == 'string') {
        this.form.patchValue({type:this.route.snapshot.queryParamMap.get('type')});
      }
      if(typeof this.route.snapshot.queryParamMap.get('orderType') == 'string') {
        this.form.patchValue({type:this.route.snapshot.queryParamMap.get('orderType')});
      }
      if(typeof this.route.snapshot.queryParamMap.get('pair') == 'string') {
        this.form.patchValue({type:this.route.snapshot.queryParamMap.get('pair')});
      }
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
      this.p2pordersTbl.sort = this.sort;
    }
    ngAfterViewChecked(): void {
      // this.ref.detectChanges();
    }
    
    populateTable(obj): void {
      this.isLoading = true;
      var data={
        limit:obj.limit,
        offset:obj.offset,
        formvalue:this.form.value
      }
      this.p2pService.getp2pOrdersTblDetails(data).subscribe((res: any) => {
          if (res.status){
            this.p2pordersTbl.data = res.data;
            let pairallList = [];
              this.p2pordersTbl.data.forEach((element: any) => {
              if (element.pairName) {
                pairallList.push({ pair: element.pairName, id: element._id})
              }
            })
            pairallList = pairallList.filter((arr, index, self) => index === self.findIndex((t) => (t.pair === arr.pair)))
            this.pairList = pairallList;
            this.length=res.total;
            this.isLoading = false;
          }
      },(err) => {
        this.notify.showSystemError(err);
      });
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
    nextPage() {
      const pageNumber = this.page + 1;
      this.form.value.pageNumber = pageNumber;
      // this.populateTable();
      this.page++
      this.buttonDisabled = false
    }
    backpage() {
      const pageNumber = this.page - 1;
    this.form.value.pageNumber = pageNumber;
    // this.populateTable();
    this.page--
    if(pageNumber==1){
      this.buttonDisabled = true
    }
    else{
      this.buttonDisabled = false
    }
    }
    ngAfterViewInit(): void {

    }
    viewTransaction(_id: string): void {
      this.router.navigate(['dashboard', 'p2p-orders-view', _id]);
    }
    ExportToCsv() {
      if(this.p2pordersTbl.data.length>0){
        let data = [];
      this.p2pordersTbl.data.forEach((element: any) => {
        data.push({
          'Transaction Date': this.datepipe.transform(element.createdDate ,'MMM dd, y, HH:mm:ss'),
          'pairName': element.pairName,
          'username': element.username,
          'email': element.email,
          'paymentNames': element.paymentNames,
          'orderType': element.orderType,
          'price': element.price,
          'Status': element.status == 1 ? 'Completed' : element.status == 2 ? 'Cancelled' : 'Processing'
        })
      })
      const options = {
        fieldSeparator: ',',
        filename: 'transactions',
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
        type: ['', false],
        orderType: ['', false],
        pair: ['', false],
        status: ['', false],
        fromdate: ['',false],
        todate: ['',false]
      });  
      this.paginator.firstPage();
      this.populateTable(this.form.value);
    }
    filterTable(){
      console.log("filterTable",this.form.value)
      this.router.navigate(['dashboard/p2p-orders-list'], { queryParams: this.form.value});
      this.populateTable(this.form.value);
    }
    compareItems(i1, i2) {
      return i1==i2;
    }
    viewOrder(_id: string): void {
      this.router.navigate(['dashboard', 'p2p-orders-view', _id]);
    }
  }