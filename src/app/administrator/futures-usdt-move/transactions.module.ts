import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/_shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FuturesUsdtMoveViewComponent } from './futures-usdt-move-view/futures-usdt-move-view.component';
import { FuturesUsdtMoveListComponent } from './futures-usdt-move-list/futures-usdt-move-list.component';


@NgModule({
  declarations: [FuturesUsdtMoveListComponent, FuturesUsdtMoveViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FuturesUsdtMoveModule { }