import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StakingHistoryService } from 'src/app/_services/stakingHistory.service';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/_services/core/notification.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-staking-history-view',
  templateUrl: './staking-history-view.component.html',
  styleUrls: ['./staking-history-view.component.scss']
})
export class StakingHistoryViewComponent implements OnInit {
  
  _id: any;
  status: string = '';
  stakingDetails: any = {};
  isLoading = true;
  rejectReason: string = '';
  keyword: string = 'Reject Reason';
  displayedColumns: string[] = [];
  stakingTbl = new MatTableDataSource<any>();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stakingHistoryService: StakingHistoryService,
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
    this.stakingHistoryService
      .getStakingHistoryDetails({_id:this._id})
      .subscribe(
        (result) => {
          if(result.status) {
            this.stakingDetails = result.data;
            this.stakingTbl.data = result.stakingBonus;
            this.isLoading = false;
          } else {
            this.notify.showError('Invalid Staking');
            this.router.navigate(['dashboard', 'staking-history-list']);
          }
        },
        (err) => {
          this.notify.showSystemError(err);
          this.router.navigate(['dashboard', 'staking-history-list']);
        }
      );
  }
  backRedirectBtn() {
    this._location.back();
  }
}