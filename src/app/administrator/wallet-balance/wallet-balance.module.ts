import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletBalanceComponent } from './wallet-balance.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [WalletBalanceComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class WalletBalanceModule { }
