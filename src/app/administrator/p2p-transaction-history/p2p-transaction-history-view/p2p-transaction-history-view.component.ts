import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { P2PService } from 'src/app/_services/p2pTransactionHistory.service';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/_services/core/notification.service';
import {Location} from '@angular/common';
import { P2PTransactionHistory } from 'src/app/_models/p2p-transactiono-history';

@Component({
  selector: 'app-p2p-transaction-history-view',
  templateUrl: './p2p-transaction-history-view.component.html',
  styleUrls: ['./p2p-transaction-history-view.component.scss']
})
export class P2PTransactionHistoryViewComponent implements OnInit {
  
  _id: any;
  status: string = '';
  p2ptransactionDetails: any = [];
  p2porderDetails : any = {};
  p2pcountryDetails : any = [];
  isLoading = true;
  rejectReason: string = '';
  userReason: string = '';
  keyword: string = 'Reject Reason';
  displayedColumns: string[] = [];
  stakingTbl = new MatTableDataSource<any>();
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
  populateValue() {
    this.P2PService
      .getp2pTransactionHistoryDetails({_id:this._id})
      .subscribe(
        (result) => {
          if(result.status) {
            this.p2ptransactionDetails = result.data;
            this.p2porderDetails = result.data && result.data[0] && result.data[0].orderDet;
            let array = [];
            this.p2porderDetails.country.length > 0 && this.p2porderDetails.country.forEach((element: any) => {
              if (element.label != "Select All") {
                array.push(element);
              }
            })
            this.p2pcountryDetails.push(array);
            this.isLoading = false;
          } else {
            this.notify.showError('Invalid P2P Transaction');
            // this.router.navigate(['dashboard', 'staking-history-list']);
          }
        },
        (err) => {
          this.notify.showSystemError(err);
          // this.router.navigate(['dashboard', 'staking-history-list']);
        }
      );
  }
  setUserReason(value: string) {
    this.userReason = value;
  }
  cancelOrder() {
    if (confirm('Are you sure cancel order?')) {
      let data = { transactiondet: this.p2ptransactionDetails,reason: this.userReason}
        this.P2PService
        .p2pcancelOrder({data})
        .subscribe(
          (result) => {
            if (result.status) {
              this.p2porderDetails = result.data;
              this.populateValue();
              this.notify.showSuccess(result.message); 
            }
          },(err) => {
            this.notify.showSystemError(err);
          }
        )
    } else {}
  }
  backRedirectBtn() {
    this._location.back();
  }
}