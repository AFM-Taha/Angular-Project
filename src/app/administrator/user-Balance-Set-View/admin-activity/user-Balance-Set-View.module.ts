import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBalanceSetViewComponent } from './user-Balance-Set-View.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [UserBalanceSetViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class userBalanceSetViewModule { }