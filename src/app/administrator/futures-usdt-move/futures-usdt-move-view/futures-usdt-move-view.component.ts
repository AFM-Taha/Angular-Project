import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/_services/core/notification.service';
import { Location } from '@angular/common';
import { FuturesUsdtMoveService } from 'src/app/_services/futures-usdt-move.service';

@Component({
  selector: 'app-transactions-view',
  templateUrl: './futures-usdt-move-view.component.html',
  styleUrls: ['./futures-usdt-move-view.component.scss']
})
export class FuturesUsdtMoveViewComponent implements OnInit {
  _id: any;
  status: string = '';
  transactionsDetails: any = {};
  isLoading = true;
  rejectReason: string = '';
  keyword: string = 'Reject Reason';
  extraStatus: string = '';
  selectedStatus: string = 'Pending';  // Default selected value
  statusOptions: string[] = ['Pending', 'Approved', 'Rejected'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private futuresUsdtMoveService: FuturesUsdtMoveService,
    private notify: NotificationService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this._id = this.route.snapshot.params._id;
    this.populateValue();
  }

  populateValue() {
    this.futuresUsdtMoveService
      .getFuturesUsdtMoveDetails(this._id)
      .subscribe(
        (result) => {
          if (result.status) {
            this.transactionsDetails = result.message && result.message[0];
            console.log("transactionsDetails:", this.transactionsDetails)
            this.keyword = (this.transactionsDetails.currencyDet.curnType == 'Fiat' && this.status == 'Approve') ? 'Transaction Id' : 'Reject Reason';
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

  get wallets() {
    return this.transactionsDetails.userDetails?.futuresSubAccount?.wallet || [];
  }

  showImage(imgURL) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imgURL);
  }

  changeStatus() {
    if (this.rejectReason == '') {
      if (this.transactionsDetails.type == 'Withdraw' && this.status == 'Approve' && this.transactionsDetails.currencyDet.curnType == 'Fiat') {
        this.notify.showError('Enter transaction Id');
        return false;
      } else if (this.status == 'Reject') {
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
    this.futuresUsdtMoveService.updateFuturesUsdtMoveStatus(data)
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
        },
        (err) => {
          this.notify.showSystemError(err);
          this.isLoading = false;
        }
      );
  }

  movenew(value: string) {
    this.extraStatus = value;
  }

  adminNewChangestatus() {
    if (this.extraStatus != 'verified') {
      this.notify.showError('Select a approval');
      return false;
    }
    this.isLoading = true;
    let data = {
      _id: this._id,
      extraStatus: this.extraStatus,
    }
    this.futuresUsdtMoveService.updateFuturesUsdtMoveStatus(data)
      .subscribe(
        (result) => {
          if (result.status) {
            this.notify.showSuccess(result.message);
            this.populateValue();
            this.transactionsDetails.move = '';
            this.isLoading = false;
          } else {
            this.notify.showError(result.message);
            this.isLoading = false;
          }
        },
        (err) => {
          this.notify.showSystemError(err);
          this.isLoading = false;
        }
      );
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

  onStatusChange(event: any) {
    // console.log('Status changed:', this._id, event.value);
    this.futuresUsdtMoveService
      .updateFuturesUsdtMoveStatus({ id: this._id, status: event.value })
      .subscribe(
        (result) => {
          // console.log('Update status result:', result);
          if (result.status) {
            this.notify.showSuccess(result.message);
            this.setStatus(event.value);
          } else {
            this.notify.showError(result.message);
          }
        },
        (err) => {
          // console.error('Error updating status:', err);
          this.notify.showSystemError('Error updating status');
        }
      );
  }
}
