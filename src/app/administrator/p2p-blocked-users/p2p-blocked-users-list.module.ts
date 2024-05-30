import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P2PBlockedUsersListComponent } from './p2p-blocked-users-list/p2p-blocked-users-list.component';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [P2PBlockedUsersListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class P2PBlockedUsersModule { }