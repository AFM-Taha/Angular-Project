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
import { Transactions } from 'src/app/_models/transactions';
import { CurrencyService } from 'src/app/_services/currency.service';
import { TransactionsService } from 'src/app/_services/transactions.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExportToCsv } from 'export-to-csv';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit, AfterViewInit, AfterViewChecked {
  form: FormGroup;
  assetUrl = environment.assetUrl;
  blocks = [];
  currencies = [];
  isLoading = false;
  displayedColumns: string[] = [];
  page = 1;
  PageData: any;
  len: any;
  buttonDisabled = true;
  limit:number= 10;
  offset:number=0;
  length:any;
  transactionsTbl = new MatTableDataSource<Transactions>();
  emptyData = new MatTableDataSource([{ empty: "row" }]);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private currencyService: CurrencyService,
    private router: Router,
    private transactionsService: TransactionsService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    public datepipe: DatePipe

  ) {
    this.displayedColumns = [
      'createdDate',
      'username',
      'email',
      'currency',
      'type',
      'amount',
      'status',
      'action',
    ];
  }
  ExportToCsv() {
    if(this.transactionsTbl.data.length>0){
      let data = [];
    this.transactionsTbl.data.forEach((element: any) => {
      data.push({
        'Transaction Date': this.datepipe.transform(element.createdDate ,'MMM dd, y, HH:mm:ss'),
        'User Name': element.userId.username,
        'Email': element.userId.email,
        'Currency': element.currencyId.currencySymbol + (element.currencyId.basecoin != 'Coin' ? ' - ' + element.currencyId.basecoin : ''),
        'Amount': element.amount,
        'Type': element.type,
        'Status': element.status == 1 ? 'Approved' : element.status == 0 ? 'Pending' : element.status == 2 ? 'Rejected' : 'Email Verification Pending',
        'Address': element.address,
        'Transaction Link': element.txnId
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
      //headers: ['Name', 'Age', 'Average', 'Approved', 'Description'] // <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
    }
    
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      status: ['', false],
      type: ['', false],
      depositType: ['', false],
      currencyId: ['', false],
      searchQuery: ['', false],
      fromdate:['',false],
      todate:['',false]
    });
    if (typeof this.route.snapshot.queryParamMap.get('status') == 'string') {
      this.form.patchValue({ status: this.route.snapshot.queryParamMap.get('status') });
    }
    if (typeof this.route.snapshot.queryParamMap.get('type') == 'string') {
      this.form.patchValue({ type: this.route.snapshot.queryParamMap.get('type') });
    }
    if (typeof this.route.snapshot.queryParamMap.get('depositType') == 'string') {
      this.form.patchValue({ depositType: this.route.snapshot.queryParamMap.get('depositType') });
    }
    if (typeof this.route.snapshot.queryParamMap.get('currencyId') == 'string') {
      this.form.patchValue({ currencyId: this.route.snapshot.queryParamMap.get('currencyId') });
    }
    if (typeof this.route.snapshot.queryParamMap.get('searchQuery') == 'string') {
      this.form.patchValue({ searchQuery: this.route.snapshot.queryParamMap.get('searchQuery') });
    }
    if(this.route.snapshot.queryParamMap.get('fromdate') !=''){
      if (typeof this.route.snapshot.queryParamMap.get('fromdate') == 'string') {
        this.form.patchValue({ fromdate: new Date(this.route.snapshot.queryParamMap.get('fromdate')) });
      }
    }
    if(this.route.snapshot.queryParamMap.get('todate') !=''){
      if (typeof this.route.snapshot.queryParamMap.get('todate') == 'string') {
        this.form.patchValue({ todate: new Date(this.route.snapshot.queryParamMap.get('todate') )});
      }
    }
    this.populateTable(this.form.value);
    this.currencyService
      .getCurrencyTblDetails()
      .subscribe(
        (result) => {
          this.currencies = result.getCurrencyTblDetails;
        },
        (err) => {

        }
      );
    this.transactionsTbl.sort = this.sort;
  }
  compareItems(i1, i2) {
    return i1 == i2;
  }
  ngAfterViewChecked(): void {
    // this.ref.detectChanges();
  }
  filterTable(): void {
    this.router.navigate(['dashboard/transactions-list'], { queryParams: this.form.value});
    this.populateTable(this.form.value);
  }
  populateTable(obj): void {
    this.isLoading = true;
    var data={
      limit:obj.limit,
      offset:obj.offset,
      formvalue:this.form.value
    }
    this.transactionsService
      .getTransactionsTblDetails(data)
      .subscribe(
        (result) => {
          this.transactionsTbl.data = result.getTransactionsTblDetails;
          this.isLoading = false;
          this.length=result.total;
        },
        (err) => {
          this.notify.showSystemError(err);
        }
      );
  }
  ngAfterViewInit(): void {
    // this.populateTable(this.form.value);
  }
  viewUsers(_id: string): void {
    this.router.navigate(['dashboard', 'transactions-details', _id]);
  }
  nextPage() {
    const pageNumber = this.page + 1;
    this.form.value.pageNumber = pageNumber;
    this.page++
    this.buttonDisabled = false
  }
  backpage() {
    const pageNumber = this.page - 1;
    this.form.value.pageNumber = pageNumber;
    this.page--;
    if(pageNumber == 1){
      this.buttonDisabled = true
    } else {
      this.buttonDisabled = false
    }
  }
  refresh(){
    this.form = this.fb.group({
      status: ['', false],
      type: ['', false],
      depositType: ['', false],
      currencyId: ['', false],
      searchQuery: ['', false],
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