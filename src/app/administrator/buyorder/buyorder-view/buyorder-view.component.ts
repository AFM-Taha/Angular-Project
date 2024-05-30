import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionsService } from 'src/app/_services/transactions.service';
import { NotificationService } from 'src/app/_services/core/notification.service';
import {Location} from '@angular/common';
import { BuyorderService } from 'src/app/_services/buyorder.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
    selector: 'app-buyorder-view',
    templateUrl: './buyorder-view.component.html',
    styleUrls: ['./buyorder-view.component.scss']
})
export class BuyorderViewComponent implements OnInit {
  _id: any;
  status: string = '';
  transactionsDetails: any = {};
  isLoading = true;
  rejectReason: string = '';
  keyword: string = 'Reject Reason';
  extraStatus:string = '';

  actionForm:FormGroup;

 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionsService: BuyorderService,
    private notify: NotificationService,
    private _location: Location,
    private fb:FormBuilder,
    private clipboard: Clipboard
  ) {
  }

  ngOnInit(): void {
    this.actionForm = this.fb.group({
      status:['', Validators.required]
    })

    this._id = this.route.snapshot.params._id;
    this.populateValue();

    
  }
  populateValue() {
    this.transactionsService
      .getUserBuycryptoTblDetails({orderID:this._id})
      .subscribe(
        (result:any) => {
          console.log(result.data[0]);
          if(result.status) {
            this.transactionsDetails = result.data[0] ;
            console.log("transactionsDetails:",this.transactionsDetails)
            //this.keyword = (this.transactionsDetails.currencyDet.curnType == 'Fiat' && this.status == 'Approve') ? 'Transaction Id' : 'Reject Reason';
            this.isLoading = false;
          } else {
            this.notify.showError('Invalid Transaction');
            this.router.navigate(['dashboard', 'transactions-list']);
          }
        },
        (err) => {
          this.notify.showSystemError(err);
          this.router.navigate(['dashboard', 'transactions-list']);
        }
      );
  }
  showImage(imgURL) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imgURL);
  }
  changeStatus() {
    if(this.rejectReason == '') {
      if(this.transactionsDetails.type=='Withdraw' && this.status=='Approve' && this.transactionsDetails.currencyDet.curnType == 'Fiat') {
        this.notify.showError('Enter transaction Id');
        return false;
      } else if(this.status=='Reject') {
        this.notify.showError('Enter reject reason');
        return false;
      }
    }
    this.isLoading = true;
    let data = {
      _id: this._id,
      status: this.status,
      rejectReason: this.rejectReason
    }
    // this.transactionsService
    //   .updateTransactions(data)
    //   .subscribe(
    //     (result) => {
    //       if(result.status) {
    //         this.notify.showSuccess(result.message);
    //         this.populateValue();
    //         this.isLoading = false;
    //       } else {
    //         this.notify.showError(result.message);
    //         this.isLoading = false;
    //       }
    //     });
  }
  movenew(value: string) {
    this.extraStatus = value;
  }
  adminNewChangestatus() {
    if (this.extraStatus != 'verified') {
      this.notify.showError('Select a aprroval');
      return false;
    }
    this.isLoading = true;
    let data = {
      _id: this._id,
      extraStatus: this.extraStatus,
    }
    // this.transactionsService
    //   .updateNewStatusTransactions(data)
    //   .subscribe(
    //     (result) => {
    //       if (result.status) {
    //         this.notify.showSuccess(result.message);
    //         this.populateValue();
    //         this.transactionsDetails.move='';
    //         this.isLoading = false;
    //       } else {
    //         this.notify.showError(result.message);
    //         this.isLoading = false;
    //       }
    //     });
  }
  setStatus(value: string) {
    this.status = value;
    this.keyword = (this.transactionsDetails.currencyDet.curnType == 'Fiat' && this.status == 'Approve') ? 'Transaction Id' : 'Reject Reason';
  }
  setReason(value: string) {
    this.rejectReason = value;
  }
  backRedirectBtn() {
    this._location.back();
  }
  selectedData:any
  submit(){
    let route = this.router.url
    let splitUrl = route.split('/');
    console.log(this.selectedData, 'value',splitUrl[3]);
    let datas = {
      buyOrderId : splitUrl[3],
      status:this.selectedData
    }
    this.transactionsService.updateUserStatus(datas).subscribe({
      next:(value:any)=>{
        console.log(value);
        this.notify.showSuccess(value.message);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
    
  }
  sortByProducts(value) {
    this.selectedData = value
    //console.log(value)
  }
  copyContent(text:String){
    //console.log(text);
    this.clipboard.copy(`${text}`);
  }
}