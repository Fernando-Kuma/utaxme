import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from '../components/home/home.module';
import { MaskPipe } from './pipe/mask.pipe';
import { PincodeComponent } from './utils/pincode/pincode.component';
import { TimerComponent } from './utils/timer/timer.component';
import { PincodeModule } from './utils/pincode';
import { TimerModule } from './utils/timer';
import { ConfirmDialogComponent } from './utils/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModule } from './utils/confirm-dialog/confirm-dialog.module';
import { DetalleDeducPersonalComponent } from './utils/detalle-deduc-personal/detalle-deduc-personal.component';
import { DetalleDeducPersonalModule } from './utils/detalle-deduc-personal';
import { ContactoComponent } from './utils/contacto/contacto.component';
import { ContactoModule } from './utils/contacto';
import { ServiceErrorDialogComponent } from './utils/service-error-dialog/service-error-dialog.component';
import { ServiceErrorDialogModule } from './utils/service-error-dialog/service-error-dialog.module';



@NgModule({
  declarations: [
    MaskPipe,
  ],
  imports: [
    CommonModule,
    HomeModule,
    PincodeModule,
    TimerModule,
    ConfirmDialogModule,
    DetalleDeducPersonalModule,
    ContactoModule,
    ServiceErrorDialogModule
  ],
  exports: [
    MaskPipe,
    PincodeComponent,
    TimerComponent,
    ConfirmDialogComponent,
    DetalleDeducPersonalComponent,
    ContactoComponent,
    ServiceErrorDialogComponent
  ],
})
export class SharedModule { }
