import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubAdminListComponent } from './sub-admin-list/sub-admin-list.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SubAdminFormComponent } from './sub-admin-form/sub-admin-form.component';


@NgModule({
  declarations: [SubAdminListComponent, SubAdminFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SubAdminModule { }
