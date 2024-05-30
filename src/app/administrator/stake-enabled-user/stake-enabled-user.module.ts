import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { stakeenableduserComponent } from './stake-enabled-user.component';
@NgModule({
  declarations: [stakeenableduserComponent],
  imports: [
    QuillModule.forRoot(),
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class stakeenableduserModule { }
