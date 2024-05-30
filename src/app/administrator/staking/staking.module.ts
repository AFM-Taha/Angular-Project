import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StakingListComponent } from './staking-list/staking-list.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StakingFormComponent } from './staking-form/staking-form.component';


@NgModule({
  declarations: [StakingListComponent, StakingFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class StakingModule { }
