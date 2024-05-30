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
import { Users } from 'src/app/_models/users';
import { UsersService } from 'src/app/_services/users.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExportToCsv } from 'export-to-csv';
import { element } from 'protractor';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users-list',
  templateUrl: './futures-subacc-list.component.html',
  styleUrls: ['./futures-subacc-list.component.scss']
})
export class FuturesSubaccListComponent implements OnInit, AfterViewInit, AfterViewChecked {
  form: FormGroup;
  assetUrl = environment.assetUrl;
  blocks = [];
  isLoading = false;
  displayedColumns: string[] = [];
  resultsLength = 0;
  page = 1;
  PageData: any;
  len: any;
  buttonDisabled = true;
  limit: number = 10;
  offset: number = 0;
  length: any;
  queryparams: any;
  currencyTbl = new MatTableDataSource<Users>();
  emptyData = new MatTableDataSource([{ empty: "row" }]);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private router: Router,
    private usersService: UsersService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    public datepipe: DatePipe
  ) {
    this.displayedColumns = [
      'registerOn',
      'username',
      'email',
      'phoneno',
      'status',
      'kycstatus',
      'bankstatus',
      'tfaenablekey',
      'action',
    ];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      searchQuery: ['', false],
      status: ['', false],
      kycstatus: ['', false],
      bankstatus: ['', false],
      sortOption: ['-1', false],
      fromdate: ['', false],
      todate: ['', false]
    });
    if (typeof this.route.snapshot.queryParamMap.get('status') == 'string') {
      this.form.patchValue({ status: this.route.snapshot.queryParamMap.get('status') });
    }
    if (typeof this.route.snapshot.queryParamMap.get('kycstatus') == 'string') {
      this.form.patchValue({ kycstatus: this.route.snapshot.queryParamMap.get('kycstatus') });
    }
    if (typeof this.route.snapshot.queryParamMap.get('bankstatus') == 'string') {
      this.form.patchValue({ bankstatus: this.route.snapshot.queryParamMap.get('bankstatus') });
    }
    if (typeof this.route.snapshot.queryParamMap.get('searchQuery') == 'string') {
      this.form.patchValue({ searchQuery: this.route.snapshot.queryParamMap.get('searchQuery') });
    }
    if (typeof this.route.snapshot.queryParamMap.get('sortOption') == 'string') {
      this.form.patchValue({ sortOption: this.route.snapshot.queryParamMap.get('sortOption') });
    }

    if (this.route.snapshot.queryParamMap.get('fromdate') != '') {
      if (typeof this.route.snapshot.queryParamMap.get('fromdate') == 'string') {
        this.form.patchValue({ fromdate: new Date(this.route.snapshot.queryParamMap.get('fromdate')) });
      }
    }
    if (this.route.snapshot.queryParamMap.get('todate') != '') {
      if (typeof this.route.snapshot.queryParamMap.get('todate') == 'string') {
        this.form.patchValue({ todate: new Date(this.route.snapshot.queryParamMap.get('todate')) });
      }
    }
    this.populateTable(this.form.value);
    // this.currencyTbl.paginator = this.paginator;
    // console.log(this.paginator,"inside the admin panels and users")
    // this.paginator.page.subscribe((response: any) => {
    //   this.paginator.pageIndex = response.pageIndex;
    //   this.paginator.pageSize = response.pageSize;
    //   this.populateTable();
    // });
    this.currencyTbl.sort = this.sort;
  }
  ExportToCsv() {
    if (this.currencyTbl.data.length > 0) {
      let data = [];
      this.currencyTbl.data.forEach((element: any) => {
        data.push({
          'Register On': this.datepipe.transform(element.registerOn, 'MMM dd, y, HH:mm:ss'),
          'User Name': element.username,
          'Email': element.email ? element.email : "",
          'Phone': element.phoneno ? element.phoneno : "",
          'KYC Status': element.kycstatus == 1 ? 'Approved' : element.kycstatus == 2 ? 'Rejected' : element.kycstatus == 0 ? 'Pending' : 'Not Uploaded',
          'Bank Status': element.bankstatus == 1 ? 'Approved' : element.bankstatus == 2 ? 'Rejected' : element.bankstatus == 0 ? 'Pending' : 'Not Uploaded'
        })
      })
      const options = {
        fieldSeparator: ',',
        filename: 'users',
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
  compareItems(i1, i2) {
    return i1 == i2;
  }
  ngAfterViewChecked(): void {
    // this.ref.detectChanges();
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  filterTable(): void {
    this.router.navigate(['dashboard/users-list'], { queryParams: this.form.value });
    this.populateTable(this.form.value);
    // this.reloadCurrentRoute()
    // window.location.reload()
  }
  populateTable(obj): void {
    this.isLoading = true;
    var data = {
      limit: obj.limit,
      offset: obj.offset,
      formvalue: this.form.value
    }
    this.usersService
      .getUsersTblDetails(data)
      .subscribe(
        (result) => {
          // if(result.getUsersTblDetails.length>0)
          this.currencyTbl.data = result.getUsersTblDetails;
          // this.len=result.getUsersTblDetails.length;
          this.len = result.total;
          this.isLoading = false;
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
    this.router.navigate(['dashboard', 'futures-subacc-details', _id]);
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
  onDate(event) {
    console.log(event.value, "eventvalue>>")
  }
  refresh() {
    this.form = this.fb.group({
      searchQuery: ['', false],
      status: ['', false],
      kycstatus: ['', false],
      bankstatus: ['', false],
      sortOption: ['-1', false],
      fromdate: ['', false],
      todate: ['', false]
    });
    this.paginator.firstPage();

    this.populateTable(this.form.value);
  }
  changepage(event) {
    if (event.pageSize != this.limit) {
      var obj1 = {
        offset: event.pageSize * event.pageIndex,
        limit: event.pageSize
      }
      this.populateTable(obj1)
    }
    else {
      var obj = {
        offset: event.pageIndex * this.limit,
        limit: this.limit
      }
      //  this.currencyTbl = ""

      this.populateTable(obj)
    }
  }
}