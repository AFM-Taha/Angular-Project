import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileFormComponent } from './my-profile-form/my-profile-form.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [MyProfileFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MyProfileModule { }
