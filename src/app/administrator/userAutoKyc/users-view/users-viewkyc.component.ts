import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/_services/users.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { TransactionsService } from 'src/app/_services/transactions.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-users-viewkyc',
  templateUrl: './users-viewkyc.component.html',
  styleUrls: ['./users-viewkyc.component.scss']
})
export class UsersViewkycComponent implements OnInit {
  _id: any;
  form: FormGroup;
  userDetails: any = {};
  isLoading = true;
  kycstatus: string = '';
  userLevel: string = '';
  bankstatus: string = '';
  rejectReason: string = '';
  transactionsDetails: any = [];
  keyword: string = 'Reject Reason';
  status: string = '';
  displayedColumns: string[] = [];
  displayedColumns1: string[] = [];
  displayedColumns2: string[] = [];
  showModal: boolean;
  viewImageDrc='';
  userKYCData={};
  walletTbl = new MatTableDataSource<any>();
  referUser = new MatTableDataSource<any>();
  userTrasactionslist = new MatTableDataSource<any>();
 
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    private notify: NotificationService,
    private _location: Location,
 
    private transactionsService: TransactionsService
  ) {
    this.displayedColumns = [
      'currencysym',
      'amount',
      'hold',
      'address'
    ];
    this.displayedColumns1 = [
      'username',
      'email',
      'registerOn'
    ];
    this.displayedColumns2 = [
      'transactionDate',
      'currency',
      'amount',
      'type',
      'status'
    ];
  }

  ngOnInit(): void {
    this.walletTbl.paginator = this.paginator;
    this.referUser.paginator = this.paginator;
    this._id = this.route.snapshot.params._id;
    this.form = this.fb.group({
      status: ['', false],
      type: ['', false],
      currencyId: ['', false],
      searchQuery: ['', false]
    });
    if(typeof this.route.snapshot.queryParamMap.get('currencyId') == 'string') {
      this.form.patchValue({currencyId:this.route.snapshot.queryParamMap.get('currencyId')});
    }
    this.populateValue();

  }
  populateValue() {
    var data={
      _id: this._id
    }
    this.usersService
      .getUserDetails({ data })
      .subscribe(
        (result) => {
          if (result.status) {
            this.userDetails = result.data.userDetails;
            this.userKYCData=this.userDetails.adharDetails;
            this.userDetails.level = typeof this.userDetails.level == 'number' ? this.userDetails.level : 1
            this.userLevel = this.userDetails.level;
            this.walletTbl.data = result.data.wallet;
            this.referUser.data = result.data.referUser;
            this.isLoading = false;
            // this.getusertransactiondetails();
          } else {
            this.notify.showError('Invalid User');
            this.router.navigate(['dashboard', 'users-listkyc']);
          }
        },
        (err) => {
          this.notify.showSystemError(err);
          this.router.navigate(['dashboard', 'users-listkyc']);
        }
      );
  }
  changeStatus(type: string) {
    this.isLoading = true;
    let data = {
      _id: this._id,
      type: type
    }
    this.usersService
      .updateUser(data)
      .subscribe(
        (result) => {
          if (result.status) {
            this.notify.showSuccess(result.message);
            this.populateValue();
            this.isLoading = false;
          } else {
            this.notify.showError(result.message);
            this.isLoading = false;
          }
        });
  }
  changeKYC() {
    this.isLoading = true;
    let data = {
      _id: this._id,
      kycstatus: this.kycstatus,
      rejectReason: this.rejectReason,
      type: 'kyc'
    }
    this.usersService
      .updateUser(data)
      .subscribe(
        (result) => {
          if (result.status) {
            this.notify.showSuccess(result.message);
            this.populateValue();
            this.isLoading = false;
          } else {
            this.notify.showError(result.message);
            this.isLoading = false;
          }
        });
  }
  setUserLevel(value: string) {
    this.userLevel = value;
  }
  changeUserLevel() {
    this.isLoading = true;
    let data = {
      _id: this._id,
      userLevel: this.userLevel,
      type: 'level'
    }
    this.usersService
      .updateUser(data)
      .subscribe(
        (result) => {
          if (result.status) {
            this.userDetails.level = this.userLevel;
            this.notify.showSuccess(result.message);
            this.isLoading = false;
          } else {
            this.notify.showError(result.message);
            this.isLoading = false;
          }
        });
  }
  rejectBankaccount(type: string) {
    this.isLoading = true;
    let data = {
      _id: this._id,
      type: type,
      bankstatus: 'Reject',
    }
    this.usersService
      .updateUser(data)
      .subscribe(
        (result) => {
          if (result.status) {
            this.notify.showSuccess(result.message);
            this.populateValue();
            this.isLoading = false;
          } else {
            this.notify.showError(result.message);
            this.isLoading = false;
          }
        });
  }
  changeBank() {
    this.isLoading = true;
    let data = {
      _id: this._id,
      bankstatus: this.bankstatus,
      rejectReason: this.rejectReason,
      type: 'bank'
    }
    this.usersService
      .updateUser(data)
      .subscribe(
        (result) => {
          if (result.status) {
            this.notify.showSuccess(result.message);
            this.populateValue();
            this.isLoading = false;
          } else {
            this.notify.showError(result.message);
            this.isLoading = false;
          }
        });
  }
  setKYCStatus(value: string) {
    this.kycstatus = value;
  }
  setBankStatus(value: string) {
    this.bankstatus = value;
  }
  setReason(value: string) {
    this.rejectReason = value;
  }
  checkObj(key: string) {
    if (typeof this.userDetails[key] == 'object') {
      var size = Object.keys(this.userDetails[key]).length;
      if (size > 0) {
        return true;
      }
    }
    return false;
  }
  backRedirectBtn() {
    this._location.back();
  }

  getusertransactiondetails() {
    this.transactionsService
      .getUserTransactionsDetails({ _id: this._id })
      .subscribe(
        (result) => {

          if (result.status) {
            this.transactionsDetails = result.getUserTrasactionDetails;
            this.userTrasactionslist = result.getUserTrasactionDetails;
            this.isLoading = false;
          }
          else {
            this.notify.showSystemError('Error');
          }
        },
        (err) => {
          this.notify.showSystemError(err);

          this.router.navigate(['dashboard', 'transactions-list']);
        }
      );

  }
  show(src:any)
  {
    this.showModal = true; // Show-Hide Modal Check
    this.viewImageDrc=src
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  checkAutoKyc(_id : string): void {
    this.router.navigate(['dashboard','user-details',_id]);
  }
}