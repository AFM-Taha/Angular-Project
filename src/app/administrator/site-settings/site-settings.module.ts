import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteSettingFormComponent } from './site-setting-form/site-setting-form.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SiteSettingFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SiteSettingsModule { }
