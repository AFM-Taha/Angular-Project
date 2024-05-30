import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P2PSettingFormComponent } from './p2p-setting-form/p2p-setting-form.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [P2PSettingFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class P2PSettingsModule { }
