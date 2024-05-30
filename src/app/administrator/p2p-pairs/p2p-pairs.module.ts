import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { P2PPairsListComponent } from './p2p-pairs-list/p2p-pairs-list.component';
import { P2PPairsFormComponent } from './p2p-pairs-form/p2p-pairs-form.component';


@NgModule({
  declarations: [P2PPairsListComponent,P2PPairsFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class P2PPairsModule { }
