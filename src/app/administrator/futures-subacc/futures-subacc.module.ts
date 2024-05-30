import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuturesSubaccListComponent } from './futures-subacc-list/futures-subacc-list.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { P2PPaymentFormComponent } from './p2p-payment-form/p2p-payment-form.component';
import { FuturesSubaccViewComponent } from './futures-subacc-view/futures-subacc-view.component';



@NgModule({
  declarations: [FuturesSubaccListComponent, FuturesSubaccViewComponent, P2PPaymentFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FuturesSubaccModule { }
