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
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { PagerModule } from '../shared/utils/pager';

import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThousandsPipe } from '../shared/pipe/thousands.pipe';



@NgModule({
  declarations: [
    BarrasEmitidasComponent,
    BarrasRecibidasComponent,
    VelocimetroComponent,
    CuadranteIngresosComponent,
    CuadranteGastosComponent,
    CuadranteDeduccionesComponent,
    CuadranteCumplimientoComponent,
    CuadranteFiscalesComponent,
    ThousandsPipe
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatTableModule,
    PagerModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
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