import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { CMSFormComponent } from './cms-form/cms-form.component';
import { CMSListComponent } from './cms-list/cms-list.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [CMSListComponent,CMSFormComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CmsModule { }
