import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P2POrderListComponent } from './p2p-orders-list/p2p-orders-list.component';
import { P2POrdersViewComponent } from './p2p-orders-view/p2p-orders-view.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [P2POrderListComponent,P2POrdersViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class P2POrderModule { }