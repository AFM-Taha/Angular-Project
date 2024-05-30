import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DerivativesPairsListComponent } from './derivatives-list/derivatives-list.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DerivativesPairsFormComponent } from './derivatives-form/derivatives-form.component';


@NgModule({
  declarations: [DerivativesPairsListComponent, DerivativesPairsFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DerivativesPairsModule { }
