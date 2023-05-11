import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Paginator } from 'array-paginator';
import * as moment from 'moment';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { ListaCfdi } from 'src/app/shared/model/espacio-trabajo.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { EspacioTrabajoService } from 'src/app/shared/service/espacio-trabajo.service';
import { CancelarDialogComponent } from './cancelar-dialog/cancelar-dialog.component';
import { DialogService } from 'src/app/shared/service/dialog.service';

@Component({
  selector: 'app-cancelar-cfdi',
  templateUrl: './cancelar-cfdi.component.html',
  styleUrls: ['./cancelar-cfdi.component.css'],
})
export class CancelarCfdiComponent implements OnInit {
  @Input() set consultaRequest(val: any) {
    this._consultaRequest = val;
  }

  _consultaRequest: any;
  tablaListaCfdi: ListaCfdi[];
  tablaCfdi: ListaCfdi[];
  form: FormGroup;
  requestDashboard: any;
  tituloProceso: string = 'Cancelar factura';
  nombreCliente: string;
  request: any;
  listaResultado: any;
  pager: any;
  verTabla: boolean = false;
  verNoEncontrados: boolean = false;
  disabledFechas: boolean = false;
  disabledOrden: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private espacioTrabajoService: EspacioTrabajoService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.nombreCliente = this.auth.usuario.nombre;
    this.crearForm();
  }

  crearForm() {
    this.form = this.formBuilder.group({
      inicial: [''],
      final: [''],
      numeroOrden: [''],
    });
  }

  back() {
    this.router.navigateByUrl(NAV.espacioTrabajo);
  }

  regresar() {
    console.log(localStorage.getItem('back-return'))
    if(localStorage.getItem('back-return') != null){
      localStorage.removeItem('back-return');
      this.router.navigateByUrl(NAV.dashboard);
    }else{
      this.router.navigateByUrl(NAV.espacioTrabajo);
    }
  }

  onPaged(page) {
    this.tablaCfdi = this.pager.page(page);
  }

  paginador(value: any) {
    this.pager = new Paginator(value, 4, 1);
    this.onPaged(1);
  }

  cancelar(cfdi: any) {
    const dialogRef = this.dialog.open(
      CancelarDialogComponent,
      this.dialogService.cancelarCfdi(cfdi)
    );
    dialogRef.afterClosed().subscribe((data) => {});
  }

  limpiarTabla() {
    this.form.reset();
    this.form.controls['numeroOrden'].enable();
    this.form.controls['inicial'].enable();
    this.form.controls['final'].enable();
    this.disabledFechas = false;
    this.disabledOrden = false;
    this.verTabla = false;
    this.verNoEncontrados = false;
  }

  actionDisabledOrden() {
    this.form.controls['numeroOrden'].disable();
    this.disabledFechas = false;
    this.disabledOrden = true;
  }

  actionDisabledFecha() {
    this.form.controls['inicial'].disable();
    this.form.controls['final'].disable();
    this.disabledFechas = true;
    this.disabledOrden = false;
  }

  listaCfdi() {
    if (this.disabledOrden) {
      this.listaFecha();
    }
    if (this.disabledFechas) {
      this.listaOrden();
    }
  }

  listaFecha() {
    let req = {
      rfc: this.auth.usuario.cliente.rfc,
      fechaInicialFilter: moment(this.form.get('inicial').value).format(
        'YYYY-MM-DD'
      ),
      fechaFinFilter: moment(this.form.get('final').value).format('YYYY-MM-DD'),
    };
    this.espacioTrabajoService.busquedaCfdiFecha(req).subscribe(
      (resp) => {
        this.tablaListaCfdi = resp.lista;
        this.tablaCfdi = this.tablaListaCfdi;
        if (this.tablaListaCfdi.length >= 1) {
          this.verTabla = true;
          this.verNoEncontrados = false;
        } else {
          this.verTabla = false;
          this.verNoEncontrados = true;
        }
        this.paginador(this.tablaListaCfdi);
      },
      (_error) => {
        console.log('::Entro al error', _error);
      }
    );
  }

  listaOrden() {
    let request = {
      rfc: this.auth.usuario.cliente.rfc,
      referencia: this.form.get('numeroOrden').value,
    };
    this.espacioTrabajoService.busquedaCfdiOrden(request).subscribe(
      (resp) => {
        this.tablaListaCfdi = resp.lista;
        this.tablaCfdi = this.tablaListaCfdi;
        if (this.tablaListaCfdi.length >= 1) {
          this.verTabla = true;
          this.verNoEncontrados = false;
        } else {
          this.verTabla = false;
          this.verNoEncontrados = true;
        }
        this.paginador(this.tablaListaCfdi);
      },
      (_error) => {
        console.log('::Entro al error', _error);
      }
    );
  }
}
