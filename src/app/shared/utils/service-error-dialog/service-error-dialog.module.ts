import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ServiceErrorDialogComponent } from './service-error-dialog.component';



@NgModule({
  declarations: [
    ServiceErrorDialogComponent
  ],
  imports: [
    MatDialogModule,
    CommonModule
  ],
  exports: [
    ServiceErrorDialogComponent
  ]
})
export class ServiceErrorDialogModule { }
