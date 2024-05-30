import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router , ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Trade } from 'src/app/_models/trade';
import { TradeService } from 'src/app/_services/trade.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { CurrencyService } from 'src/app/_services/currency.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExportToCsv } from 'export-to-csv';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.scss']
})
export class TradeHistoryComponent implements OnInit {
  form: FormGroup;
  assetUrl = environment.assetUrl;
  pairsData = [];
  isLoading = false;
  displayedColumns: string[] = [];
  page = 1;
  PageData: any;
  len: any;
  buttonDisabled = true;
  historyTbl = new MatTableDataSource<Trade>();
  emptyData = new MatTableDataSource([{ empty: "row" }]);
  limit:number= 10;
  offset:number=0;
  length:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private ref: ChangeDetectorRef,
    private router: Router,
    private tradeService: TradeService,
    private currencyService: CurrencyService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private notify: NotificationService,
    public datepipe: DatePipe
  ) {
    this.displayedColumns = [
      'dateTime',
      'buyerUser',
      'sellerUser',
      'pairName',
      'orderType',
      'filledAmount',
      'tradePrice',
      'status'
    ];
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      pairName: ['', false],
      searchQuery: ['', false],
      type: ['', false],
      orderType: ['', false],
      status: ['', false],
      fromdate:['',false],
      todate:['',false]
    });
    if(typeof this.route.snapshot.queryParamMap.get('pairName') == 'string') {
      this.form.patchValue({pairName:this.route.snapshot.queryParamMap.get('pairName')});
    }
    if(typeof this.route.snapshot.queryParamMap.get('orderType') == 'string') {
      this.form.patchValue({orderType:this.route.snapshot.queryParamMap.get('orderType')});
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
    // this.historyTbl.paginator = this.paginator;
    // this.paginator.page.subscribe((response: any) => {
    //   this.paginator.pageIndex = response.pageIndex;
    //   this.paginator.pageSize = response.pageSize;
    //   this.populateTable();
    // });
    this.historyTbl.sort = this.sort;
    this.currencyService
      .getPairsTblDetails()
      .subscribe(
        (result) => {
          this.pairsData = result.getPairsTblDetails;
          this.populateTable(this.form.value);
        },
        (err) => {
          this.notify.showSystemError(err);
        }
      );
  } 
  ExportToCsv() {
    if(this.historyTbl.data.length>0){
      let data = [];
      this.historyTbl.data.forEach((element: any) => {
        try {
          data.push({
            'Trade Date' :this.datepipe.transform(element.dateTime ,'MMM dd, y, HH:mm:ss'),
            'Buyer Name' : element.buyerUserId.username,
            'Seller Name' : element.sellerUserId.username,
            'Pair' : element.pairName,
            'Order Type' : element.orderType.charAt(0).toUpperCase() + element.orderType.slice(1),
            'Amount' : element.filledAmount,
            'Price' : element.tradePrice,
            'Status' : element.status ? element.status : 'filled',
          })
        } catch(e) {
          console.log('ExportToCsv',e)
        }
      })
      const options = { 
        fieldSeparator: ',',
        filename: 'trade-history',
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
    this.tradeService
      .getTradeHistory(data)
      .subscribe(
        (result) => {
          this.historyTbl.data = result.getTradeHistoryTblDetails;
          console.log(this.historyTbl.data,"this is trade history")
          this.length=result.total;
          this.isLoading = false;
        },
        (err) => {
          this.notify.showSystemError(err);
        }
      );
  }
  compareItems(i1, i2) {
    return i1==i2;
  }
  filterTable(): void {
    this.router.navigate(['dashboard/trade-history'], { queryParams: this.form.value});
    this.populateTable(this.form.value);
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
  refresh(){
    this.form = this.fb.group({
      pairName: ['', false],
      searchQuery: ['', false],
      type: ['', false],
      orderType: ['', false],
      status: ['', false],
      fromdate:['',false],
      todate:['',false]
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
}