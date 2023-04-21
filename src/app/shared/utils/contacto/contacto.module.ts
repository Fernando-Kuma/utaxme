import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ContactoComponent } from './contacto.component';



@NgModule({
  declarations: [
    ContactoComponent
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    CommonModule
  ],
  exports: [
    ContactoComponent
  ]
})
export class ContactoModule { }
