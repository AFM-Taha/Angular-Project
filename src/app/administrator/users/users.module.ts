import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersViewComponent } from './users-view/users-view.component';
import { P2PPaymentFormComponent } from './p2p-payment-form/p2p-payment-form.component';

@NgModule({
  declarations: [UsersListComponent, UsersViewComponent,P2PPaymentFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
