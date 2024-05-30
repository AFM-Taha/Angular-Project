import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userTradeTdsComponent } from './user-TradeTds.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [userTradeTdsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class userTradeTdsModule { }