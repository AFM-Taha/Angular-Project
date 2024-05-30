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
import { Currency } from 'src/app/_models/currency';
import { CurrencyService } from 'src/app/_services/currency.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit, AfterViewInit, AfterViewChecked {
  form:FormGroup;
  assetUrl = environment.assetUrl;
  blocks = [];
  isLoading = false;
  displayedColumns: string[] = [];
  resultsLength = 0;

 //code by p
 page = 1;
 PageData :any;
 len : any  ;
 buttonDisabled = true ;
 limit:number= 10;
 offset:number=0;
 length:any;
  currencyTbl = new MatTableDataSource<Currency>();
  emptyData = new MatTableDataSource([{ empty: "row" }]);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private router: Router,
    private currencyService: CurrencyService,
    private notify: NotificationService,
    private route: ActivatedRoute

  ) {
    this.displayedColumns = [
      'currencyName',
      'currencySymbol',
      'basecoin',
      'image',
      'status',
      'action',
    ];
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      currency: ['', false],
      symbol:['',false],
      basecoin:['',false],
      sortOption: ['-1', false]
    });
    if(typeof this.route.snapshot.queryParamMap.get('currency') == 'string') {
      this.form.patchValue({currency:this.route.snapshot.queryParamMap.get('currency')});
    }
    if(typeof this.route.snapshot.queryParamMap.get('symbol') == 'string') {
      this.form.patchValue({symbol:this.route.snapshot.queryParamMap.get('symbol')});
    }
    if(typeof this.route.snapshot.queryParamMap.get('basecoin') == 'string') {
      this.form.patchValue({basecoin:this.route.snapshot.queryParamMap.get('basecoin')});
    }
    // this.currencyTbl.paginator = this.paginator;
    console.log(this.currencyTbl,"this is currancy table")
    // this.paginator.page.subscribe((response: any) => {
    //   this.paginator.pageIndex = response.pageIndex;
    //   this.paginator.pageSize = response.pageSize;
    //   this.populateTable();
    // });
    this.currencyTbl.sort = this.sort;
  } 
  filterTable(){
    this.router.navigate(['dashboard/currency-list'], { queryParams: this.form.value});
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
    this.currencyService
      .getCurrencyTblfilterDetails(data)
      .subscribe(
        (result) => {
          this.currencyTbl.data=result.getCurrencyTblDetails;
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
  addCurrency(): void {
    this.router.navigate(['dashboard','currency-edit', 1]);
  }
  editCurrency(_id : string): void {
    this.router.navigate(['dashboard','currency-edit', _id]);
  }


  // code by p
  nextPage(){
    const pageNumber =this.page+1 ;
    this.currencyService.postNextPage(pageNumber).subscribe((result)=>{
      this.PageData =result
      this.currencyTbl.data = this.PageData.getCurrencyTblDetails ;
      this.len = this.PageData.getCurrencyTblDetails.length;
      this.buttonDisabled = false
      // console.log(this.PageData,"this is the response of page data ")
      // console.log(this.currencyTbl )
      this.page++
    })
  }
  backpage(){
    if (this.page > 1){
    const pageNumber = this.page -1 ;
    this.currencyService.postNextPage(pageNumber).subscribe((result)=>{
      this.PageData = result
      this.currencyTbl.data = this.PageData.getCurrencyTblDetails ;
      this.len = this.PageData.getCurrencyTblDetails.length;
        // this.buttonDisabled = false
    })
  }
  else{
    this.buttonDisabled = true ;
  }
  }
  refresh(){
    this.form = this.fb.group({
      currency: ['', false],
      symbol:['',false],
      basecoin:['',false],
      sortOption: ['-1', false]
    });
    this.paginator.firstPage();

  }
  ExportToCsv(){
    if(this.currencyTbl.data.length>0){
      let data = [];
      this.currencyTbl.data.forEach((element: any) => {
        try {
          data.push({
            'Currency Name' : element.currencyName ,
            'Symbol' : element.currencySymbol,
            'Base Coin' : element.basecoin,
            'Status' : element.status == 1 ? 'Active' : 'De-Active'
          })
        } catch(e) {
          console.log('ExportToCsv',e)
        }
      })
      const options = { 
        fieldSeparator: ',',
        filename: 'Currency-list',
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