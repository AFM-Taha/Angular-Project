import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P2PFeedBackListComponent } from './p2p-feedback-list/p2p-feedback-list.component';
import { P2PFeedBackViewComponent } from './p2p-feed-view/p2p-feed-view.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [P2PFeedBackListComponent,P2PFeedBackViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class P2PFeedbackModule { }