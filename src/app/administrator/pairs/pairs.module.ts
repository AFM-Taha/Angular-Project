import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PairsListComponent } from './pairs-list/pairs-list.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PairsFormComponent } from './pairs-form/pairs-form.component';


@NgModule({
  declarations: [PairsListComponent, PairsFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PairsModule { }
