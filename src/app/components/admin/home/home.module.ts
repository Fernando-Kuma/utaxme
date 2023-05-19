import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandejaEntradaComponent } from './bandeja-entrada/bandeja-entrada.component';
import { AccesosDirectosComponent } from './accesos-directos/accesos-directos.component';
import { EspacioTrabajoComponent } from './espacio-trabajo/espacio-trabajo.component';



@NgModule({
  declarations: [
    BandejaEntradaComponent,
    AccesosDirectosComponent,
    EspacioTrabajoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
