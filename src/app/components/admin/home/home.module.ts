import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandejaEntradaComponent } from './bandeja-entrada/bandeja-entrada.component';
import { AccesosDirectosComponent } from './accesos-directos/accesos-directos.component';
import { EspacioTrabajoAdminComponent } from './espacio-trabajo/espacio-trabajo.component';
import { SharedModule } from "../../../shared/shared.module";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClientesComponent } from './espacio-trabajo/clientes/clientes.component';
import { NuevoClienteComponent } from './espacio-trabajo/clientes/nuevo-cliente/nuevo-cliente.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { GeneralesComponent } from './espacio-trabajo/clientes/nuevo-cliente/generales/generales.component';
import { DomicilioComponent } from './espacio-trabajo/clientes/nuevo-cliente/domicilio/domicilio.component';
import { MembresiaComponent } from './espacio-trabajo/clientes/nuevo-cliente/membresia/membresia.component';
import { CertificadosComponent } from './espacio-trabajo/clientes/nuevo-cliente/certificados/certificados.component';



@NgModule({
  declarations: [
    BandejaEntradaComponent,
    AccesosDirectosComponent,
    EspacioTrabajoAdminComponent,
    ClientesComponent,
    NuevoClienteComponent,
    HomeComponent,
    GeneralesComponent,
    DomicilioComponent,
    MembresiaComponent,
    CertificadosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterModule,
    MatInputModule,
    MatTabsModule
  ]
})
export class HomeModule { }
