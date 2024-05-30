import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Staking } from 'src/app/_models/staking';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StakingService } from 'src/app/_services/staking.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { ExportToCsv } from 'export-to-csv';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-staking-referral',
  templateUrl: './staking-referral.component.html',
  styleUrls: ['./staking-referral.component.scss']
})
export class StakingReferralComponent implements OnInit {
  assetUrl = environment.assetUrl;
  blocks = [];
  isLoading = false;
  displayedColumns: string[] = [];
  getStakRefTbl = new MatTableDataSource<any>();
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
    private stakingreferCommision: StakingService,
    private notify: NotificationService,
    public datepipe: DatePipe,
    private route: ActivatedRoute
  ) {
    this.displayedColumns = [
      'userId',
      'refUser',
      'commissionAmount',
      'currencyName',
      'description',
      'dateTime'
    ];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      currency: ['', false],
      referral:['',false],
      fromdate:['',false],
      todate:['',false],
      email:['',false],
      sortOption: ['-1', false]
    });
    // this.getStakRefTbl.paginator = this.paginator;
    // this.paginator.page.subscribe((response: any) => {
    //   this.paginator.pageIndex = response.pageIndex;
    //   this.paginator.pageSize = response.pageSize;
    //   this.populateTable();
    // });
    if (typeof this.route.snapshot.queryParamMap.get('currency') == 'string') {
      this.form.patchValue({ currency: this.route.snapshot.queryParamMap.get('currency') });
    }
    if (typeof this.route.snapshot.queryParamMap.get('referral') == 'string') {
      this.form.patchValue({ referral: this.route.snapshot.queryParamMap.get('referral') });
    }
    if(this.route.snapshot.queryParamMap.get('fromdate') !=''){
      if (typeof this.route.snapshot.queryParamMap.get('fromdate') == 'string') {
        this.form.patchValue({ fromdate:new Date(this.route.snapshot.queryParamMap.get('fromdate'))});
      }
    }
    if(this.route.snapshot.queryParamMap.get('todate') !=''){
      if (typeof this.route.snapshot.queryParamMap.get('todate') == 'string') {
        this.form.patchValue({ todate:new Date(this.route.snapshot.queryParamMap.get('todate'))});
      }
    }
    if (typeof this.route.snapshot.queryParamMap.get('email') == 'string') {
      this.form.patchValue({ email: this.route.snapshot.queryParamMap.get('email') });
    }
    this.getStakRefTbl.sort = this.sort;
    this.populateTable(this.form.value);
  }
  ExportToCsv() {
    if(this.getStakRefTbl.data.length > 0){
      let data = [];
    this.getStakRefTbl.data.forEach((element: any) => {
      try {
        data.push({
          'userId': element.userId.email,
          'refUser': element.refUser.email,
          'Commision Amount': element.commissionAmount,
          'currency': element.currencyName,
          'Description': element.description,
          'dateTime': this.datepipe.transform(element.dateTime ,'MMM dd, y, HH:mm:ss'),

        })
      } catch (e) {
        console.log('ExportToCsv',e);
      }
    })
    const options = {
      fieldSeparator: ',',
      filename: 'Referral-history',
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
  filterTable(){
    // this.router.navigate(['dashboard/pairs-list'], { queryParams: this.form.value});

    this.router.navigate(['dashboard/Referral'], { queryParams: this.form.value});
    this.populateTable(this.form.value);
  }
  populateTable(obj): void {
    this.isLoading = true;
    var data={
      limit:obj.limit,
      offset:obj.offset,
      formvalue:this.form.value
    }
    this.stakingreferCommision
      .getStakingReferralfilter(data)
      .subscribe(
        (result) => {
          this.getStakRefTbl.data = result.data;
          this.length=result.total;
          console.log( this.getStakRefTbl,"this is refferal");
          this.isLoading = false;
        },
        (err) => {
          this.notify.showSystemError(err);
        }
      );
  }
  // code by p
  nextPage(){
    const pageNumber =this.page+1 ;
    this.stakingreferCommision.postNextPairsPage(pageNumber).subscribe((result)=>{
      this.PageData = result
      this.getStakRefTbl.data = this.PageData.getStakingTblDetails ;
      this.len = this.PageData.getStakingTblDetails.length;
      this.buttonDisabled = false
      console.log(this.len,"this is the response of page data ")
      this.page++

    })
  }
  backpage(){
    if (this.page > 1){
    const pageNumber = this.page -1 ;
    this.stakingreferCommision.postNextPairsPage(pageNumber).subscribe((result)=>{
      this.PageData = result
      this.getStakRefTbl.data = this.PageData.getStakingTblDetails ;
      this.len = this.PageData.getStakingTblDetails.length;
        // this.buttonDisabled = false
      this.page--
    })
  }else{this.buttonDisabled = true ;}
  }
  refresh(){
    this.form = this.fb.group({
      currency: ['', false],
      referral:['',false],
      fromdate:['',false],
      todate:['',false],
      email:['',false],
      sortOption: ['-1', false]
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