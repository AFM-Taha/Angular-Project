import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsComponent } from './docs/docs.component';
import { DocsFormComponent } from './docs-form/docs-form.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [DocsComponent, DocsFormComponent],
  imports: [
    QuillModule.forRoot(),
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ApiDocsModule { }
