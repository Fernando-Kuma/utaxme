import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandejaEntradaAdminComponent } from './bandeja-entrada/bandeja-entrada.component';
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
import { AdministracionComponent } from './espacio-trabajo/administracion/administracion.component';
import { PagosComponent } from './espacio-trabajo/pagos/pagos.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.module';
import { PagerModule } from 'src/app/shared/utils/pager';
import { FilterErrorModule } from 'src/app/shared/utils/filter-error';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { DndDirective } from './espacio-trabajo/clientes/nuevo-cliente/certificados/file-drag-n-drop.directive';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AgregarCertificadoComponent } from './espacio-trabajo/clientes/nuevo-cliente/certificados/agregar-certificado/agregar-certificado.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ThousandsPipe } from 'src/app/shared/pipe/thousands.pipe';
import { GraphicsModule } from 'src/app/graphics/graphics.module';
import { DetallePagoComponent } from './espacio-trabajo/pagos/detalle-pago/detalle-pago.component';
import { AlertModule } from 'src/app/shared/utils/alertas';
import { MatDialogModule } from '@angular/material/dialog';
import { ConceptosComponent } from './espacio-trabajo/pagos/conceptos/conceptos.component';
import { GenerarFacturaComponent } from './espacio-trabajo/pagos/generar-factura/generar-factura.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { ListaConceptosComponent } from './espacio-trabajo/pagos/lista-conceptos/lista-conceptos.component';
import { EquipoComponent } from './espacio-trabajo/equipo/equipo.component';
import { InvitarComponent } from './espacio-trabajo/equipo/invitar/invitar.component';
import { HeaderHomeModule } from 'src/app/shared/utils/header-home';
import { HeaderAdminModule } from 'src/app/shared/utils/header-admin/header-admin.module';
import { SafePipe } from 'src/app/shared/pipe/safe.pipe';
import { CumplimientoFiscalComponent } from './espacio-trabajo/cumplimiento-fiscal/cumplimiento-fiscal.component';
import { DetalleCumplimientoComponent } from './espacio-trabajo/cumplimiento-fiscal/detalle-cumplimiento/detalle-cumplimiento.component';
import { DeclaracionesComponent } from './espacio-trabajo/declaraciones/declaraciones.component';
import { DetalleDeclaracionComponent } from './espacio-trabajo/declaraciones/detalle-declaracion/detalle-declaracion.component';
import { BuscarClienteComponent } from './espacio-trabajo/clientes/nuevo-cliente/buscar-cliente/buscar-cliente.component';


@NgModule({
  declarations: [
    BandejaEntradaAdminComponent,
    AccesosDirectosComponent,
    EspacioTrabajoAdminComponent,
    ClientesComponent,
    NuevoClienteComponent,
    HomeComponent,
    GeneralesComponent,
    DomicilioComponent,
    MembresiaComponent,
    CertificadosComponent,
    DndDirective,
    AgregarCertificadoComponent,
    AdministracionComponent,
    PagosComponent,
    DetallePagoComponent,
    ConceptosComponent,
    GenerarFacturaComponent,
    ListaConceptosComponent,
    EquipoComponent,
    InvitarComponent,
    CumplimientoFiscalComponent,
    DetalleCumplimientoComponent,
    DeclaracionesComponent,
    DetalleDeclaracionComponent,
    BuscarClienteComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    PagerModule,
    FilterErrorModule,
    MatDividerModule,
    GraphicsModule,
    AlertModule,
    MatDialogModule,
    MatCheckboxModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatExpansionModule,
    HeaderAdminModule
  ]
})
export class HomeModule { }
