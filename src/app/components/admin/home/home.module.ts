import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandejaEntradaComponent } from './bandeja-entrada/bandeja-entrada.component';
import { AccesosDirectosComponent } from './accesos-directos/accesos-directos.component';
import { EspacioTrabajoComponent } from './espacio-trabajo/espacio-trabajo.component';
import { SharedModule } from "../../../shared/shared.module";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
    declarations: [
        BandejaEntradaComponent,
        AccesosDirectosComponent,
        EspacioTrabajoComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class HomeModule { }
