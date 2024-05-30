import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P2PReportListComponent } from './p2p-report-list/p2p-report-list.component';
import { P2PReportViewComponent } from './p2p-report-view/p2p-report-view.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [P2PReportListComponent,P2PReportViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class P2PReportModule { }