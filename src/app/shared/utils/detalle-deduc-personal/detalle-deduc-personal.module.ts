import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleDeducPersonalComponent } from './detalle-deduc-personal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    DetalleDeducPersonalComponent
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  exports: [
    DetalleDeducPersonalComponent
  ]
})
export class DetalleDeducPersonalModule { }
