import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P2PTransactionHistoryListComponent } from './p2p-transaction-history-list/p2p-transaction-history-list.component';
import { P2PTransactionHistoryViewComponent } from './p2p-transaction-history-view/p2p-transaction-history-view.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [P2PTransactionHistoryListComponent,P2PTransactionHistoryViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class P2PTransactionModule { }