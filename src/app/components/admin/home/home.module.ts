import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandejaEntradaComponent } from './bandeja-entrada/bandeja-entrada.component';
import { AccesosDirectosComponent } from './accesos-directos/accesos-directos.component';
import { EspacioTrabajoComponent } from './espacio-trabajo/espacio-trabajo.component';
import { SharedModule } from "../../../shared/shared.module";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClientesComponent } from './espacio-trabajo/clientes/clientes.component';
import { NuevoClienteComponent } from './espacio-trabajo/clientes/nuevo-cliente/nuevo-cliente.component';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    BandejaEntradaComponent,
    AccesosDirectosComponent,
    EspacioTrabajoComponent,
    ClientesComponent,
    NuevoClienteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule
  ]
})
export class HomeModule { }
