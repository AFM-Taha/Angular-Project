import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/_services/users.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { TransactionsService } from 'src/app/_services/transactions.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { StakingHistoryService } from 'src/app/_services/stakingHistory.service';
import { StakingHistory } from 'src/app/_models/staking-history';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ExportToCsv } from 'export-to-csv';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit {
  _id: any;
  form: FormGroup;
  userDetails: any = {};
  isLoading = true;
  kycstatus: string = '';
  userLevel: string = '';
  userType: string ='';
  userReason: string = '';
  bankstatus: string = '';
  rejectReason: string = '';
  promotedReferralCode: string = '';
  promotedReferralCommission: number = 0;
  transactionsDetails: any = [];
  balanceDetails:any=[];
  userstakingtbl:any=[];
  tradevalue:any=[];
  stakebalance:any=[];
  p2pBalance:any=[];
  commissionHistory:any=[];
  keyword: string = 'Reject Reason';
  status: string = '';
  displayedColumns: string[] = [];
  displayedColumns1: string[] = [];
  displayedColumns2: string[] = [];
  displayedColumns3: string[] = [];
  displayedColumns4: string[] = [];
  displayedColumns5: string[] = [];
  displayedColumns6: string[] = [];
  showModal: boolean;
  viewImageDrc=''
  limit:number=10;
  offset:number=0;
  length:any;
  tradelen: any;
  walletlen: any;
  referlen: any;
  transactionlen:any;
  balancelen:any;
  stakeLen:any;
  p2pLen:any;
  filename:any;
  commissionlen:any;
  stakarray: any = [];
  totalActiveStaking: any = 0.00;
  totalClosedStaking: any = 0.00;
  totalActiveBonus: any = 0.00;
  totalClosedBonus: any = 0.00;
  walletTbl = new MatTableDataSource<any>();
  referUser = new MatTableDataSource<any>();
  userTrasactionslist = new MatTableDataSource<any>();
  tradehistory = new MatTableDataSource<any>();
  stakingTbl = new MatTableDataSource<any>();
  userbalancedetails = new MatTableDataSource<any>();
  stakeBalancedetails = new MatTableDataSource<any>();
  p2pBalancedetails = new MatTableDataSource<any>();
  commisonRefer= new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    private notify: NotificationService,
    private _location: Location,
    private stakingHistoryService: StakingHistoryService,
    public datepipe: DatePipe,
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
    this.displayedColumns3 = [
      'dateTime',
      'buyerUser',
      'sellerUser',
      'pairName',
      'orderType',
      'filledAmount',
      'tradePrice'
    ];
    this.displayedColumns4=[
      'dateTime',
      'oldBalance',
      'amount',
      'difference',
      'currencySymbol',
      'type'
    ];
    this.displayedColumns5 = [
      'createdDate',
      'package',
      'amount',
      'bonus',
      'currency',
      'lastBonusDay',
      'maturityDate'
    ];
    this.displayedColumns6 = [
      'dateTime',
      'email',
      'convertedAmount',
      'currencyName'
    ];

  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if(tabChangeEvent.index > 0) {
      switch(tabChangeEvent.index) {
        case 1:
          this.getrefferalhistory({'id':this.userDetails._id});
          break;
        case 2:
          this.getusertransactiondetails({'id':this.userDetails._id});
          break;
        case 3:
          this.gettradehistory({'id':this.userDetails._id});
          break;
        case 4:
          this.getuserbalance({'id':this.userDetails._id});
          break;
          case 5:
          this.getstakinghistory({'id':this.userDetails._id});
          break;
          case 6:
          this.getStakingBalance({'id':this.userDetails._id});
          break;
          case 7:
          this.getp2pBalance({'id':this.userDetails._id});
            break;
          default: 
            this.getRefferalCommission({'id':this.userDetails._id});
          break;
      }      
    }
  }
  ngOnInit(): void {
    // this.walletTbl.paginator = this.paginator;
    // this.referUser.paginator = this.paginator;
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
    this.populateValue(this.form);

  }
  populateValue(obj) {
    var data={
      limit:obj.limit,
      offset:obj.offset,
      _id: this._id
    }
    this.usersService
      .getUserDetails({ data })
      .subscribe(
        (result) => {
          if (result.status) {
            this.userDetails = result.data.userDetails;
            this.userDetails.level = typeof this.userDetails.level == 'number' ? this.userDetails.level : 1
            this.userLevel = this.userDetails.level;
            this.walletTbl.data = result.data.wallet;
            this.walletlen=result.data.walletcount;
            this.isLoading = false;
          } else {
            this.notify.showError('Invalid User');
            this.router.navigate(['dashboard', 'users-list']);
          }
        },
        (err) => {
          this.notify.showSystemError(err);
          this.router.navigate(['dashboard', 'users-list']);
        }
      );
      // this.getUserTotal()
  }
  ExportToCsv(exportkeyparam){
    let data = [];
    if(exportkeyparam=='wallet'){
      this.filename ='Wallet & Address'
      this.walletTbl.data.forEach((element: any) => {
        data.push({
          // 'Register On' : this.datepipe.transform(element.registerOn ,'MMM dd, y, HH:mm:ss'),
          'Currency Symbol' : element.currencysym +'-' + 'Coin',
          'Balance' : 'Wallet Balance :'+element.amount+"Wallet Hold :" +element.hold +"Wallet Balance:"+element.stakingAmount +'Staking Hold :'+element.stakingHold + "P2P Balance:" +element.p2pAmount + "P2P Hold" +element.p2pHold,
          'Total Balance':element.amount+element.hold+element.stakingAmount+element.stakingHold,
          'Address':element.address
        })
      })
    }
    else if(exportkeyparam=='referral'){
      this.filename ='Referral'
      this.referUser.data.forEach((element: any) => {
        data.push({
          // 'Register On' : this.datepipe.transform(element.registerOn ,'MMM dd, y, HH:mm:ss'),
          'User Name' : element.username,
          'Email Address' : element.email,
          'Register On':this.datepipe.transform(element.registerOn ,'MMM dd, y, HH:mm:ss')
        })
      })
    }
    else if(exportkeyparam=='Transaction'){
      this.filename ='Transaction'
      this.userTrasactionslist.data.forEach((element: any) => {
        console.log(element.currencyId.currencySymbol,"vvvvvvvv")
        data.push({
          // 'Register On' : this.datepipe.transform(element.registerOn ,'MMM dd, y, HH:mm:ss'),
          'Transaction Date':this.datepipe.transform(element.createdDate ,'MMM dd, y, HH:mm:ss'),
          'Currency' : element.currencyId.currencySymbol + (element.currencyId.basecoin != 'Coin' ? ' - ' + element.currencyId.basecoin : ''),
          'Amount' : element.amount,
          'Type':element.type,
          'Status':element.status == 1 ? 'Approved' : element.status == 0 ? 'Pending' : element.status == 2 ? 'Rejected' : 'Email Verification Pending'
        })
      })
    }
    else if(exportkeyparam=='Trade'){
      this.filename ='Trade History'
      this.tradehistory.data.forEach((element: any) => {
        data.push({
          // 'Register On' : this.datepipe.transform(element.registerOn ,'MMM dd, y, HH:mm:ss'),
          'Trade Date' :this.datepipe.transform(element.dateTime ,'MMM dd, y, HH:mm:ss'),
          'Buyer Name' : element.buyerUserId.username,
          'Seller Name' : element.sellerUserId.username,
          'Pair' : element.pairName,
          'Amount' : element.filledAmount,
          'Price' : element.tradePrice,
          'Order Type' : element.orderType.charAt(0).toUpperCase() + element.orderType.slice(1)
        })
      })
    }
    else if(exportkeyparam=='Balance'){
      this.filename ='Balance Updatiom'
      this.userbalancedetails.data.forEach((element: any) => {
        data.push({
          'Date' : this.datepipe.transform(element.dateTime ,'MMM dd, y, HH:mm:ss'),
          'Old Balance' : element.oldBalance,
          'Amount' : element.amount,
          'Difference' : element.difference,
          'Currency' : element.currencySymbol,
          'Type' : element.type
        })
      })
    }
    else if(exportkeyparam=='Staking'){
      this.filename ='Staking History'
      this.stakingTbl.data.forEach((element: any) => {
        data.push({
          'Staking Date': this.datepipe.transform(element.createdDate ,'MMM dd, y, HH:mm:ss'),
          'Package Name': element.package.packageName,
          'Amount': element.amount,
          'Profit': element.bonus,
          'Currency': element.currency,
          'Next profit Date':(element.maturityDate > element.nextBonusDay ?
            ( this.datepipe.transform(element.nextBonusDay,'MMM dd, y, HH:mm:ss')): '-'),
          'Return Date': this.datepipe.transform(element.maturityDate,'MMM dd, y, HH:mm:ss'),
          'Status': element.status == 1 ? 'Closed' : 'Active',
        })
      })
    }
    else if(exportkeyparam=='Stakebal'){
      this.filename ='Staking Balance Updation'
      this.stakeBalancedetails.data.forEach((element: any) => {
        data.push({
          'Date' : this.datepipe.transform(element.dateTime ,'MMM dd, y, HH:mm:ss'),
          'Old Balance' : element.oldBalance,
          'Amount' : element.amount,
          'Difference' : element.difference,
          'Currency' : element.currencySymbol,
          'Type' : element.type
        })
      })
    }
    else if(exportkeyparam=='P2Pbal'){
      this.filename ='P2P Balance Updation'
      this.p2pBalancedetails.data.forEach((element: any) => {
        data.push({
          'Date' : this.datepipe.transform(element.dateTime ,'MMM dd, y, HH:mm:ss'),
          'Old Balance' : element.oldBalance,
          'Amount' : element.amount,
          'Difference' : element.difference,
          'Currency' : element.currencySymbol,
          'Type' : element.type
        })
      })
    }
    else if(exportkeyparam=='Commission'){
      this.filename ='Refferal Commission'
      this.commisonRefer.data.forEach((element: any) => {
        data.push({
          'Date':this.datepipe.transform(element.dateTime ,'MMM dd, y, HH:mm:ss'),
          'Email Address' : element.refUser.email,
          'Commission' : element.convertedAmount,
          'Currency Name' : element.currencyName

        })
      })
    }
    const options = { 
      fieldSeparator: ',',
      filename: this.filename,
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: false,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
     console.log('options')
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);

  }
  // getUserTotal(){
  //   this.usersService
  //     .getUserTotal({"_id":this._id})
  //     .subscribe(
  //       (result) => {
  //         console.log(result,"result>>>>>")
  //       })
  // }
  changeStatus(type: string) {
    if(type != 'tfa') {
      if(this.userReason == '') {
        this.notify.showError('Please enter Block/Active Reason');
        return false;
      }
    }
    this.isLoading = true;
    let data = {
      _id: this._id,
      type: type,
      userReason: this.userReason
    }
    this.usersService
      .updateUser(data)
      .subscribe(
        (result) => {
          if (result.status) {
            this.notify.showSuccess(result.message);
            this.populateValue(data);
            this.isLoading = false;
          } else {
            this.notify.showError(result.message);
            this.isLoading = false;
          }
        });
  }
  changeKYC(kycMode) {
    this.isLoading = true;
    let data = {
      _id: this._id,
      kycstatus: this.kycstatus,
      rejectReason: this.rejectReason,
      type: 'kyc',
      kycMode: kycMode,
    }
    this.usersService
      .updateUser(data)
      .subscribe(
        (result) => {
          if (result.status) {
            this.notify.showSuccess(result.message);
            // this.populateValue();
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
  setUserType(value: string) {
    this.userType = value;
  }
  setUserReason(value: string) {
    this.userReason = value;
  }
  setPromotedReferralCode(value: string) {
    this.promotedReferralCode = value;
  }
  setPromotedReferralCommission(value: number) {
    this.promotedReferralCommission = value;
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
            // this.populateValue();
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
            // this.populateValue();
            this.isLoading = false;
          } else {
            this.notify.showError(result.message);
            this.isLoading = false;
          }
        });
  }
  changeUserType () {
    this.isLoading = true;
    if (this.userType == "promoted") {
      if (this.promotedReferralCommission >= 90) {
        this.notify.showSuccess("Maximum Referral Commission 90");
        this.populateValue(this.form);
        return false;
      } 
      if (0.01 >= this.promotedReferralCommission) {
        this.notify.showSuccess("Minum Referral Commission 0.01");
        this.populateValue(this.form);
        return false;
      } 
    }
    let data = {
      _id: this._id,
      referralCode: this.promotedReferralCode,
      referralCommission: this.promotedReferralCommission,
      userType: this.userType,
      type: 'promotedreferral'
    } 
    this.usersService
    .updateUser(data)
    .subscribe(
      (result) => {
        if (result.status) {
          this.notify.showSuccess(result.message);
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
    console.log("checkObj:",key,this.userDetails[key])
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
  checkAutoKyc(_id : string): void {
    this.router.navigate(['dashboard','user-detailskyc',_id]);
  }
  getusertransactiondetails(obj) {
    var data={
      _id: obj.id,
      limit:obj.limit,
      offset:obj.offset
    }
    this.transactionsService
      .getUserTransactionsDetails({ data})
      .subscribe(
        (result) => {

          if (result.status) {
            this.transactionsDetails = result.getUserTrasactionDetails;
            this.userTrasactionslist.data = result.getUserTrasactionDetails;
            this.transactionlen =result.total;
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
  getuserbalance(obj){
    var data={
      _id: obj.id,
      limit:obj.limit,
      offset:obj.offset
    }
    this.usersService.getuserbalance({data}).subscribe((result) => {
      if (result.status) {
        this.balanceDetails = result.userbalance;

        this.userbalancedetails.data=result.userbalance;
        this.balancelen =result.total;
      }
      else{
        this.userbalancedetails.data=[]
      }
    })
  }
  getp2pBalance(obj){
    var data={
      _id: obj.id,
      limit:obj.limit,
      offset:obj.offset
    }
    this.usersService.getP2PBalance({data}).subscribe((result) => {
      if (result.status) {
        this.p2pBalance=result.p2pBalance;
        this.p2pBalancedetails.data=result.p2pBalance;
        this.p2pLen =result.total;
      }
      else{
        this.p2pBalancedetails.data=[]
      }
    })
  }
  getStakingBalance(obj){
    var data={
      _id: obj.id,
      limit:obj.limit,
      offset:obj.offset
    }
    this.usersService.getStakeBalance({data}).subscribe((result) => {
      if (result.status) {
        this.stakebalance=result.stakeBalance;
        this.stakeBalancedetails.data=result.stakeBalance;
        this.stakeLen =result.total;
      }
      else{
        this.stakeBalancedetails.data=[]
      }
    })
  }
  getstakinghistory(obj){
    var data={
      _id:obj.id,
      limit:obj.limit,
      offset:obj.offset
      
    }
    this.stakingHistoryService
      .getuserstakinghistory({data})
      .subscribe(
        (result) => {
          if (result.status) {
            this.stakingTbl.data= result.getstakingHistoryTblDetails;
            this.userstakingtbl=result.getstakingHistoryTblDetails;
            this.length = result.total;
            this.isLoading = false;
          } else {
            this.stakingTbl.data = [];
            // this.totalActiveStaking = 0;
            this.isLoading = false;
          }
        },
        (err) => {
          this.notify.showSystemError(err);
        }
      );
  }
  gettradehistory(obj){
    var data={
      _id:obj.id,
      limit:obj.limit,
      offset:obj.offset
    }
    this.usersService.getusertradehistory({data}).subscribe((result) => {
      if (result.status) {
        this.tradevalue=result.userhistory;
        this.tradehistory.data=result.userhistory;
        this.tradelen =result.total;
      }
      else{
        this.tradehistory.data =[];
        this.isLoading = false;
      }
    })
  }
  getrefferalhistory(obj){
    var data={
      _id:obj.id,
      limit:obj.limit,
      offset:obj.offset
    }
    this.usersService.getuserreferralhistory({data}).subscribe((result) => {
      if (result.status) {
        this.referUser.data =result.referUser;
        this.referlen =result.total;
      }
      else{
        this.referUser.data =[];
        this.isLoading = false;
      }
    })
  }
  getRefferalCommission(obj){
    var data={
      _id:obj.id,
      limit:obj.limit,
      offset:obj.offset
    }
    this.usersService.getuserreferralcommision({data}).subscribe((result) => {
      if (result.status) {
        this.commisonRefer.data= result.commission
        this.commissionHistory =result.commission;
        this.commissionlen =result.total;
      }
      else{
        this.commisonRefer.data =[];
        this.isLoading = false;
      }
    })
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
  changepage(event,objs){
    console.log("objs_objs:",objs)
    if(event.pageSize!=this.limit){
      var obj1={offset:event.pageSize*event.pageIndex,limit:event.pageSize,id:this._id}
      if(objs =='Balance'){
        this.getuserbalance(obj1)
      }
      else if(objs=='staking'){
        this.getstakinghistory(obj1)
      }
      else if(objs=='Transaction'){
        this.getusertransactiondetails(obj1)
      }
      else if(objs=='trade'){
        this.gettradehistory(obj1)
      }
      else if(objs=='referral'){
        this.getrefferalhistory(obj1)
      }
      else if(objs=='stakebal'){
        this.getStakingBalance(obj1)
      }
      else if(objs=='p2pbal'){
        this.getp2pBalance(obj1)
      }
      else if(objs=='commissionRef'){
        this.getRefferalCommission(obj1)
      }
      
    }
    else{
      var obj={
        offset:event.pageIndex * this.limit,
       limit:this.limit,
       id:this._id
     }
      if(objs =='Balance'){
        this.getuserbalance(obj)
      }
      else if(objs=='staking'){
        this.getstakinghistory(obj)
      }
      else if(objs=='Transaction'){
        this.getusertransactiondetails(obj)
      }
      else if(objs=='trade'){
        this.gettradehistory(obj)
      }
      else if(objs=='referral'){
        this.getrefferalhistory(obj)
      }
      else if(objs=='stakebal'){
        this.getStakingBalance(obj)
      }
      else if(objs=='p2pbal'){
        this.getp2pBalance(obj)
      }
      else if(objs=='commissionRef'){
        this.getRefferalCommission(obj)
      }

    }
  }
  
}