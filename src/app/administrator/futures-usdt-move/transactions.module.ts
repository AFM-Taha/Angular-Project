import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FuturesUsdtMoveViewComponent } from './futures-usdt-move-view/futures-usdt-move-view.component';


@NgModule({
  declarations: [TransactionsListComponent, FuturesUsdtMoveViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FuturesUsdtMoveModule { }