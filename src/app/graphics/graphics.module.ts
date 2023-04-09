import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarrasEmitidasComponent } from './barras-emitidas/barras-emitidas.component';
import { BarrasRecibidasComponent } from './barras-recibidas/barras-recibidas.component';
import { VelocimetroComponent } from './velocimetro/velocimetro.component';



@NgModule({
  declarations: [
    BarrasEmitidasComponent,
    BarrasRecibidasComponent,
    VelocimetroComponent
  ],
  imports: [
    CommonModule

    
  ]
})
export class GraphicsModule { }
