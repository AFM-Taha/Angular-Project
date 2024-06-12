import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionsViewComponent } from './transactions-view/transactions-view.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';


@NgModule({
  declarations: [TransactionsViewComponent, TransactionsListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class TransactionsModule { }