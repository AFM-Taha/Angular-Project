import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { FAQFormComponent } from './faq-form/faq-form.component';
import { FAQListComponent } from './faq-list/faq-list.component';


@NgModule({
  declarations: [FAQListComponent,FAQFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FaqModule { }
