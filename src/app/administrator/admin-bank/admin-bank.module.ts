import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBankFormComponent } from './admin-bank-form/admin-bank-form.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AdminBankFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminBankModule { }
