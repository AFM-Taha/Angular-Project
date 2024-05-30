import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { EmailTemplateFormComponent } from './email-template-form/email-template-form.component';
import { EmailTemplateListComponent } from './email-template-list/email-template-list.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [EmailTemplateListComponent,EmailTemplateFormComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class EmailTemplateModule { }
