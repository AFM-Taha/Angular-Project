import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StakingReferralComponent } from './staking-referral.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [StakingReferralComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class StakingReferralModule { }
