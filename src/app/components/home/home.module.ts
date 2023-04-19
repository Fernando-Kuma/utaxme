import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderHomeModule } from 'src/app/shared/utils/header-home';
import { HomeComponent } from './home.component';
import { GraphicsModule } from 'src/app/graphics/graphics.module';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CancelarCfdiComponent } from './espacio-trabajo/cancelar-cfdi/cancelar-cfdi.component';
import { GenerarCfdiComponent } from './espacio-trabajo/generar-cfdi/generar-cfdi.component';
import { ClientesFrecuentesComponent } from './espacio-trabajo/clientes-frecuentes/clientes-frecuentes.component';
import { CrearProdServComponent } from './espacio-trabajo/crear-prod-serv/crear-prod-serv.component';
import { EspacioTrabajoComponent } from './espacio-trabajo/espacio-trabajo.component';
import { MatTabsModule } from '@angular/material/tabs';





@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    CancelarCfdiComponent,
    GenerarCfdiComponent,
    ClientesFrecuentesComponent,
    CrearProdServComponent,
    EspacioTrabajoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    GraphicsModule,
    HeaderHomeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule, 
    MatInputModule
  ]
})
export class HomeModule { }
