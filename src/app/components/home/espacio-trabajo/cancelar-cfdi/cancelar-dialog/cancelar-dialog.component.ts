import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { ConfirmarCancelarDialogComponent } from '../confirmar-cancelar-dialog/confirmar-cancelar-dialog.component';
import { EspacioTrabajoService } from 'src/app/shared/service/espacio-trabajo.service';
import * as moment from 'moment';
import { ListaCfdi } from 'src/app/shared/model/espacio-trabajo.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-cancelar-dialog',
  templateUrl: './cancelar-dialog.component.html',
  styleUrls: ['./cancelar-dialog.component.css'],
})
export class CancelarDialogComponent implements OnInit {
  catalogo: any;
  disabled: boolean = true;
  public form: FormGroup;
  tablaListaCfdiFecha: ListaCfdi[];
  tablaListaCfdiOrden: ListaCfdi[];
  mostrarListCfdi: boolean = false;
  motivo: any;
  selectedMotivo: string;
  motivoSeleccionado: string;
  nuevaOrdenSeleccionado: string;
  selectedNewOrder: string;
  mostrarInfo: boolean = false;
  fechaTimbrado: string;
  rfcReceptor: string;
  total: number;
  uidd: string;

  constructor(
    public dialogRef: MatDialogRef<CancelarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private espacioTrabajoService: EspacioTrabajoService,
    private dialogService: DialogService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.crearForm();
    this.obtenerCatalogos();
  }

  actionMostrarSelect() {
    this.motivoSeleccionado = this.selectedMotivo;
    if (
      this.form.controls['motivoCancelacion'].value ==
      'Comprobante emitido con errores con relacion'
    ) {
      this.mostrarListCfdi = true;
      this.listaFecha();
    } else {
      this.mostrarListCfdi = false;
      this.mostrarInfo = false;
    }
  }

  mostrarInfoB() {
    this.mostrarInfo = true;
  }

  actionNuevaOrden() {
    this.nuevaOrdenSeleccionado = this.selectedNewOrder;
    this.listaOrden();
  }

  crearForm() {
    this.form = this.formBuilder.group({
      nOrden: [{ value: this.data.cfdi.referencia, disabled: this.disabled }],
      motivoCancelacion: [null, [Validators.required]],
      nOrdenNuevo: [null, []],
    });
  }

  obtenerCatalogos() {
    this.espacioTrabajoService.obtenerCatalogoForm().subscribe(
      (response) => {
        this.catalogo = response.catalogoMotivoCancelacion;
      },
      (_error) => {
        console.log('Error en catalogo: ', _error);
      }
    );
  }

  listaOrden() {
    let request = {
      rfc: this.auth.usuario.cliente.rfc,
      referencia: this.form.get('nOrdenNuevo').value,
    };
    this.espacioTrabajoService.busquedaCfdiOrden(request).subscribe(
      (resp) => {
        this.tablaListaCfdiOrden = resp.lista;
        this.fechaTimbrado = this.tablaListaCfdiOrden[0].fechaTimbrado;
        this.rfcReceptor = this.tablaListaCfdiOrden[0].rfcReceptor;
        this.total = this.tablaListaCfdiOrden[0].total;
        this.uidd = this.tablaListaCfdiOrden[0].uidd;
      },
      (_error) => {
        console.log('::Entro al error', _error);
      }
    );
  }

  listaFecha() {
    let req = {
      rfc: this.auth.usuario.cliente.rfc,
      fechaInicialFilter: moment(this.data.cfdi.fechaTimbrado).format(
        'YYYY-MM-DD'
      ),
      fechaFinFilter: moment().format('YYYY-MM-DD'),
    };
    this.espacioTrabajoService.busquedaCfdiFecha(req).subscribe(
      (resp) => {
        this.tablaListaCfdiFecha = resp.lista;
      },
      (_error) => {
        console.log('::Entro al error', _error);
      }
    );
  }

  confirmarCancelacionDialog(item) {
    let motivo = this.form.controls['motivoCancelacion'].value;
    const dialogRef = this.dialog.open(
      ConfirmarCancelarDialogComponent,
      this.dialogService.confirmarCancelarCfdi(item, motivo)
    );
    dialogRef.afterClosed().subscribe((data) => {
      if (data == true) {
        this.closeDialog();
      }
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
