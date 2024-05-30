import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeHistoryComponent } from './trade-history.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TradeHistoryComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class TradeHistoryModule { }