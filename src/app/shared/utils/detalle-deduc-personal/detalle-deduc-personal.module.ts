import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleDeducPersonalComponent } from './detalle-deduc-personal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    DetalleDeducPersonalComponent
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatMenuModule,
    CommonModule
  ],
  exports: [
    DetalleDeducPersonalComponent
  ]
})
export class DetalleDeducPersonalModule { }
