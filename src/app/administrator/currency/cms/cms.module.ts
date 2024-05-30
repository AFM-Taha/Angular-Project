import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { CMSFormComponent } from './cms-form/cms-form.component';
import { CMSListComponent } from './cms-list/cms-list.component';


@NgModule({
  declarations: [CMSListComponent,CMSFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CmsModule { }
