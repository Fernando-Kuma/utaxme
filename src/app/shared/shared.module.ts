import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from '../components/client/home/home.module';
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
import { HeaderAdminComponent } from './utils/header-admin/header-admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MaskPipe
  ],
  imports: [
    CommonModule,
    HomeModule,
    PincodeModule,
    TimerModule,
    ConfirmDialogModule,
    DetalleDeducPersonalModule,
    ContactoModule,
    ServiceErrorDialogModule,
    MatToolbarModule, 
    MatMenuModule, 
    MatIconModule, 
    MatButtonModule,
    MatTabsModule,
    RouterModule,
  ],
  exports: [
    MaskPipe,
    PincodeComponent,
    TimerComponent,
    ConfirmDialogComponent,
    DetalleDeducPersonalComponent,
    ContactoComponent,
    ServiceErrorDialogComponent,
  ],
})
export class SharedModule { }
