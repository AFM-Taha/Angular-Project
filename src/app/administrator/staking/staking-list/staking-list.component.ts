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
import { Staking } from 'src/app/_models/staking';
import { StakingService } from 'src/app/_services/staking.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-staking-list',
  templateUrl: './staking-list.component.html',
  styleUrls: ['./staking-list.component.scss']
})
export class StakingListComponent implements OnInit, AfterViewInit, AfterViewChecked {
  form:FormGroup;
  assetUrl = environment.assetUrl;
  blocks = [];
  isLoading = false;
  displayedColumns: string[] = [];
  resultsLength = 0;
  stakingTbl = new MatTableDataSource<Staking>();
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
    private stakingService: StakingService,
    private notify: NotificationService,
    private route: ActivatedRoute
  ) {
    this.displayedColumns = [
      'stakingName',
      'maturityDays',
      'status',
      'action',
    ];
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      currencySymbol:['',false],
      status: ['', false],
      sortOption: ['-1', false],
      _id:['',false]
      
    });
    if(typeof this.route.snapshot.queryParamMap.get('currencySymbol') == 'string') {
      this.form.patchValue({currencySymbol:this.route.snapshot.queryParamMap.get('currencySymbol')});
    }
    if(typeof this.route.snapshot.queryParamMap.get('status') == 'string') {
      this.form.patchValue({status:this.route.snapshot.queryParamMap.get('status')});
    }
    // this.stakingTbl.paginator = this.paginator;
    // this.paginator.page.subscribe((response: any) => {
    //   this.paginator.pageIndex = response.pageIndex;
    //   this.paginator.pageSize = response.pageSize;
    //   this.populateTable();
    // });
    this.stakingTbl.sort = this.sort;
  } 
  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }
  filterTable(){
    this.router.navigate(['dashboard/staking-list'], { queryParams: this.form.value});
    this.populateTable(this.form.value);
  }
  populateTable(obj): void {
    this.isLoading = true;
    var data={
      limit:obj.limit,
      offset:obj.offset,
      formvalue:this.form.value
    }
    this.stakingService
      .getStakingTblDetailsfilter(data)
      .subscribe(
        (result) => {
          this.stakingTbl.data=result.getStakingTblDetails;
          this.length = result.total;
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
  addStaking(): void {
    this.router.navigate(['dashboard','staking-edit', 1]);
  }
  editStaking(_id : string): void {
    this.router.navigate(['dashboard','staking-edit', _id]);
  }

  // code by p
  nextPage(){
    const pageNumber =this.page+1 ;
    this.stakingService.postNextPairsPage(pageNumber).subscribe((result)=>{
      this.PageData = result
      this.stakingTbl.data = this.PageData.getStakingTblDetails ;
      this.len = this.PageData.getStakingTblDetails.length;
      this.buttonDisabled = false
      this.page++

    })
  }
  backpage(){
    if (this.page > 1){
    const pageNumber = this.page -1 ;
    this.stakingService.postNextPairsPage(pageNumber).subscribe((result)=>{
      this.PageData = result
      this.stakingTbl.data = this.PageData.getStakingTblDetails ;
      this.len = this.PageData.getStakingTblDetails.length;
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
      currencySymbol:['',false],
      status: ['', false],
      sortOption: ['-1', false]
    });
    this.paginator.firstPage();

    this.populateTable(this.form.value)
  }
  ExportToCsv(){
    if(this.stakingTbl.data.length>0){
      let data = [];
      this.stakingTbl.data.forEach((element: any) => {
        try {
          data.push({
            'Staking Currency' : element.currencyId.currencySymbol,
            'Maturity Days' : element.maturityDays,
            'Status' : element.status == 1 ? 'Active' : 'De-Active',
          })
        } catch(e) {
          console.log('ExportToCsv',e)
        }
      })
      const options = { 
        fieldSeparator: ',',
        filename: 'Staking-list',
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