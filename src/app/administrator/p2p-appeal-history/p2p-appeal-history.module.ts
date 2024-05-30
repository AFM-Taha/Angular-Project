import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P2PAppealHistoryListComponent } from './p2p-appeal-history-list/p2p-appeal-history-list.component';
import { P2PAppealHistoryViewComponent } from './p2p-appeal-history-view/p2p-appeal-history-view.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [P2PAppealHistoryListComponent,P2PAppealHistoryViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class P2PAppealModule { }