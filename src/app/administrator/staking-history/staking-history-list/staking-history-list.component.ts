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
import { StakingHistory } from 'src/app/_models/staking-history';
import { CurrencyService } from 'src/app/_services/currency.service';
import { StakingHistoryService } from 'src/app/_services/stakingHistory.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExportToCsv } from 'export-to-csv';
import { DatePipe } from '@angular/common';
import { StakingService } from 'src/app/_services/staking.service';
@Component({
  selector: 'app-staking-history-list',
  templateUrl: './staking-history-list.component.html',
  styleUrls: ['./staking-history-list.component.scss']
})
export class StakingHistoryListComponent implements OnInit, AfterViewInit, AfterViewChecked {
  form: FormGroup;
  assetUrl = environment.assetUrl;
  blocks = [];
  currencies = [];
  isLoading = false;
  displayedColumns: string[] = [];
  stakingTbl = new MatTableDataSource<StakingHistory>();
  emptyData = new MatTableDataSource([{ empty: "row" }]);
  totalActiveStaking: any = 0.00;
  totalClosedStaking: any = 0.00;
  totalActiveBonus: any = 0.00;
  totalClosedBonus: any = 0.00;
  stakarray: any = [];
  page = 1;
  PageData: any;
  len: any;
  buttonDisabled = true;
  limit:number= 10;
  offset:number=0;
  length:any;
  stakePackagesList = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private currencyService: CurrencyService,
    private router: Router,
    private stakingHistoryService: StakingHistoryService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private stakingService: StakingService,
  ) {
    this.displayedColumns = [
      'createdDate',
      'username',
      'email',
      'package',
      'amount',
      'bonus',
      'currency',
      'lastBonusDay',
      'maturityDate',
      // 'profitAmount',
      'status',
      'action',

    ];
  }
  ExportToCsv() {
    if(this.stakingTbl.data.length>0){
      let data = [];
    this.stakingTbl.data.forEach((element: any) => {
      data.push({
        'Staking Date': this.datepipe.transform(element.createdDate ,'MMM dd, y, HH:mm:ss'),
        'User Name': element.userId.username,
        'Email': element.userId.email,
        'Amount': element.amount,
        'Bonus': element.bonus,
        'Currency': element.currency,
        'Package Name': element.package.packageName,
        'Return Date': element.maturityDate,
        'Status': element.status == 1 ? 'Closed' : 'Active',
      })
    })
    const options = {
      fieldSeparator: ',',
      filename: 'staking-history',
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
  stak: any = []
  ngOnInit(): void {
    this.form = this.fb.group({
      status: ['', false],
      currency: ['', false],
      maturityfrom: ['', false],
      maturityto:['',false],
      Bonusfrom: ['', false],
      Bonusto:['',false],
      searchQuery: ['', false],
      searchQuery1: ['', false],
      selectPackage: ['', false],
    });
    if (typeof this.route.snapshot.queryParamMap.get('status') == 'string') {
      this.form.patchValue({ status: this.route.snapshot.queryParamMap.get('status') });
    }
    if (typeof this.route.snapshot.queryParamMap.get('currency') == 'string') {
      this.form.patchValue({ currency: this.route.snapshot.queryParamMap.get('currency') });
    }
    if (typeof this.route.snapshot.queryParamMap.get('selectPackage') == 'string') {
      this.form.patchValue({ selectPackage: this.route.snapshot.queryParamMap.get('selectPackage') });
    }
    if (typeof this.route.snapshot.queryParamMap.get('searchQuery') == 'string') {
      this.form.patchValue({ searchQuery: this.route.snapshot.queryParamMap.get('searchQuery') });
    }
    if (typeof this.route.snapshot.queryParamMap.get('searchQuery1') == 'string') {
      this.form.patchValue({ searchQuery1: this.route.snapshot.queryParamMap.get('searchQuery1') });
    }
    if(this.route.snapshot.queryParamMap.get('maturityfrom') !=''){
      if (typeof this.route.snapshot.queryParamMap.get('maturityfrom') == 'string') {
        this.form.patchValue({ maturityfrom:new Date(this.route.snapshot.queryParamMap.get('maturityfrom'))});
      }
    }
    if(this.route.snapshot.queryParamMap.get('maturityto') !=''){
      if (typeof this.route.snapshot.queryParamMap.get('maturityto') == 'string') {
        this.form.patchValue({ maturityto:new Date(this.route.snapshot.queryParamMap.get('maturityto')) });
      }
    }
    if(this.route.snapshot.queryParamMap.get('Bonusfrom') !=''){
      if (typeof this.route.snapshot.queryParamMap.get('Bonusfrom') == 'string') {
            this.form.patchValue({ Bonusfrom:new Date(this.route.snapshot.queryParamMap.get('Bonusfrom'))});
      }
    }
    if(this.route.snapshot.queryParamMap.get('Bonusto') !=''){
      if (typeof this.route.snapshot.queryParamMap.get('Bonusto') == 'string') {
        this.form.patchValue({ Bonusto:new Date(this.route.snapshot.queryParamMap.get('Bonusto'))});
      }
    }
    // this.stakingTbl.paginator = this.paginator;
    // this.paginator.page.subscribe((response: any) => {
    //   this.paginator.pageIndex = response.pageIndex;
    //   this.paginator.pageSize = response.pageSize;
    //   this.populateTable();
    // });

    this.currencyService
      .getCurrencyTblDetails()
      .subscribe(
        (result) => {
          let curList = JSON.parse(JSON.stringify(result.getCurrencyTblDetails));
          let checkObj = {};
          curList.forEach(element => {
            if (typeof checkObj[element.currencyId] != 'string') {
              checkObj[element.currencyId] = 'inserted';
              this.currencies.push(element);
            }
          });
        },
        (err) => {

        }
      );
    this.stakingTbl.sort = this.sort;
  }
  compareItems(i1, i2) {
    return i1 == i2;
  }
  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }
  filterTable(): void {
    this.router.navigate(['dashboard/staking-history-list'], { queryParams: this.form.value });
    this.populateTable(this.form.value);
  }
  populateTable(obj): void {
    this.isLoading = true;
    this.stakingHistoryService.getStakingTableDetailsSum(this.form.value).subscribe(
      (result) => {
        this.totalActiveStaking = result.data.totalActiveStaking;
        this.totalActiveBonus = result.data.totalActiveBonus;
        this.totalClosedStaking = result.data.totalClosedStaking;
        this.totalClosedBonus = result.data.totalClosedBonus;
      },
    );
    var data={
      limit:obj.limit,
      offset:obj.offset,
      formvalue:this.form.value
    }
    this.stakingHistoryService
      .getStakingTblDetails(data)
      .subscribe(
        (result) => {
          if (result.status) {
            this.stakingTbl.data = result.getstakingHistoryTblDetails;
            this.stakarray = this.stakingTbl.data;
            this.length = result.total;
            this.isLoading = false;
          } else {
            this.stakingTbl.data = [];
            this.totalActiveStaking = 0;
            this.isLoading = false;
          }
        },
        (err) => {
          this.notify.showSystemError(err);
        }
      );
      this.isLoading = true;
    this.stakingService
      .getStakingTblDetails()
      .subscribe(
        (result) => {
 
          let stackPackagesList=result.getStakingTblDetails[0].packages
          let stackLenght= Object.keys(stackPackagesList).length
  
          for(let pack =0 ; pack < stackLenght; pack++){
            console.log(result.getStakingTblDetails[0].packages[pack].packageName,'packanme');
            this.stakePackagesList.push({"pack":result.getStakingTblDetails[0].packages[pack].packageName})
          }
        },
        (err) => {
          this.notify.showSystemError(err);
        }
      );
  }
  ngAfterViewInit(): void {
    this.populateTable(this.form.value);
  }
  viewStaking(_id: string): void {
    this.router.navigate(['dashboard', 'staking-details', _id]);
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
    if (pageNumber == 1) {
      this.buttonDisabled = true
    }
    else {
      this.buttonDisabled = false
    }
  }
  refresh(){
    this.form = this.fb.group({
      status: ['', false],
      currency: ['', false],
      maturityfrom: ['', false],
      maturityto:['',false],
      Bonusfrom: ['', false],
      Bonusto:['',false],
      searchQuery: ['', false],
      searchQuery1: ['', false]
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