import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListkycComponent } from './users-list/users-listkyc.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersViewkycComponent } from './users-view/users-viewkyc.component';


@NgModule({
  declarations: [UsersListkycComponent, UsersViewkycComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class usersviewkyc { }
