import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarrasEmitidasComponent } from './barras-emitidas/barras-emitidas.component';
import { BarrasRecibidasComponent } from './barras-recibidas/barras-recibidas.component';
import { VelocimetroComponent } from './velocimetro/velocimetro.component';
import { CuadranteIngresosComponent } from './cuadrante-ingresos/cuadrante-ingresos.component';
import { CuadranteGastosComponent } from './cuadrante-gastos/cuadrante-gastos.component';
import { CuadranteDeduccionesComponent } from './cuadrante-deducciones/cuadrante-deducciones.component';
import { CuadranteCumplimientoComponent } from './cuadrante-cumplimiento/cuadrante-cumplimiento.component';
import { CuadranteFiscalesComponent } from './cuadrante-fiscales/cuadrante-fiscales.component';

import {MatDividerModule} from '@angular/material/divider';



@NgModule({
  declarations: [
    BarrasEmitidasComponent,
    BarrasRecibidasComponent,
    VelocimetroComponent,
    CuadranteIngresosComponent,
    CuadranteGastosComponent,
    CuadranteDeduccionesComponent,
    CuadranteCumplimientoComponent,
    CuadranteFiscalesComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule
  ],
  exports: [
    BarrasEmitidasComponent,
    BarrasRecibidasComponent,
    VelocimetroComponent,
    CuadranteIngresosComponent,
    CuadranteGastosComponent,
    CuadranteDeduccionesComponent,
    CuadranteCumplimientoComponent,
    CuadranteFiscalesComponent
  ],
})
export class GraphicsModule { }
