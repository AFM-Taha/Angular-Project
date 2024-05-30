import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StakingHistoryListComponent } from './staking-history-list/staking-history-list.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StakingHistoryViewComponent } from './staking-history-view/staking-history-view.component';


@NgModule({
  declarations: [StakingHistoryListComponent, StakingHistoryViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class StakingHistoryModule { }