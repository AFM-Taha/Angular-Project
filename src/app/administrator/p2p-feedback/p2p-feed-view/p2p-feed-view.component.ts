import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { P2PService } from 'src/app/_services/p2pTransactionHistory.service';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/_services/core/notification.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-p2p-feed-view',
  templateUrl: './p2p-feed-view.component.html',
  styleUrls: ['./p2p-feed-view.component.scss']
})
export class P2PFeedBackViewComponent implements OnInit {
  
  _id: any;
  status: string = '';
  p2pfeedBackDetails: any = [];
  p2porderDetails : any = {};
  isLoading = true;
  page = 1;
  PageData: any;
  len: any;
  orderStatus = 0;
  verifyStatus = 0;
  appealStatus = 0;
  rejectReason: string = '';
  userReason: string = '';
  keyword: string = 'Reject Reason';
  displayedColumns: string[] = [];
  limit:number= 10;
  offset:number=0;
  length:any;
  stakingTbl = new MatTableDataSource<any>();
  chartHistoryUser=[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private P2PService: P2PService,
    private notify: NotificationService,
    private _location: Location
  ) {
    this.displayedColumns = [
      'createdDate',
      'bonus',
      'currency',
    ];
  }

  ngOnInit(): void {
    this._id = this.route.snapshot.params._id;
    this.populateValue();
  }
  userDetails=[];
  appealHistory=[];

  populateValue() {
    this.P2PService
      .getp2pFeedbackDetails({_id:this._id})
      .subscribe(
        (result) => {
          if(result.status) {
            this.p2pfeedBackDetails = result.data;
            this.isLoading = false;
            this.length = result.total;
          } else {
            this.notify.showError('Invalid P2P Report Details');
          }
        },
        (err) => {
          this.notify.showSystemError(err);
        }
      );
  }
  backRedirectBtn() {
    this._location.back();
  }
  paymentRecived() {
    if (confirm('Are you sure payment received?')) {
      this.P2PService
        .p2ppaymentReceived({orderDet: this.p2porderDetails})
        .subscribe(
          (result) => {
            if (result.status) {
              this.p2pfeedBackDetails = result.data;
              this.populateValue();
              this.notify.showSuccess(result.message); 
            }
          },(err) => {
            this.notify.showSystemError(err);
          }
        )
    } else { }
  }
  setUserReason(value: string) {
    this.userReason = value;
  }
  cancelAppeal() {
    if (confirm('Are you sure cancel appeal?')) {
      let data = { transactiondet: this.p2porderDetails, appealdet: this.p2pfeedBackDetails ,reason: this.userReason}
        this.P2PService
        .p2pcancelAppeal({data})
        .subscribe(
          (result) => {
            if (result.status) {
              this.p2pfeedBackDetails = result.data;
              this.populateValue();
              this.notify.showSuccess(result.message); 
            }
          },(err) => {
            this.notify.showSystemError(err);
          }
        )
    } else {}
  }
  getUserName(user: any): string {
    if (!user) {
      return null;
    }
    if(user == this.userDetails[0].aPealCreaterUserId){
      return this.userDetails[0].apealCreaterName;
    }
    else{
    
        return this.userDetails[1].toApealName;
      
    
    }
   
  }
  getType(user: any): string {
    if (!user) {
      return null;
    }
    if(user == this.userDetails[0].aPealCreaterUserId){
      return this.userDetails[0].type;
    }
    else{
        return this.userDetails[1].type;
    }
  }
}