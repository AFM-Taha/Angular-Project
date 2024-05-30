import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminactivityComponent } from './admin-activity.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminactivityComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminactivityModule { }