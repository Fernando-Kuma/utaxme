import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { HeaderHomeModule } from 'src/app/shared/utils/header-home';
import { HomeComponent } from './home.component';
import { GraphicsModule } from 'src/app/graphics/graphics.module';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import {MatExpansionModule} from '@angular/material/expansion';
import { ConfiguracionAvanzadaComponent } from './espacio-trabajo/generar-cfdi/configuracion-avanzada/configuracion-avanzada.component';
import { ConceptosComponent } from './espacio-trabajo/generar-cfdi/conceptos/conceptos.component';
import { CrearConceptoComponent } from './espacio-trabajo/generar-cfdi/crear-concepto/crear-concepto.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PagerModule } from 'src/app/shared/utils/pager';
import { MatTableModule } from '@angular/material/table';





@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    CancelarCfdiComponent,
    GenerarCfdiComponent,
    ClientesFrecuentesComponent,
    CrearProdServComponent,
    EspacioTrabajoComponent,
    ConfiguracionAvanzadaComponent,
    ConceptosComponent,
    CrearConceptoComponent,
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
    ReactiveFormsModule,
    MatExpansionModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatAutocompleteModule,
    PagerModule,
    MatTableModule,
  ],
  exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule, 
    MatInputModule
  ]
})
export class HomeModule { }
