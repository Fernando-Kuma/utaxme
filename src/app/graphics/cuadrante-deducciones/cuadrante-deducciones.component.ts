import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Paginator } from 'array-paginator';
import { DeduccionesFiscale } from 'src/app/shared/model/dashboard.mode';
import { DashboardService } from 'src/app/shared/service/dashboard.service';
import { ConfirmDialogComponent } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.component';
import { DetalleDeducPersonalComponent } from 'src/app/shared/utils/detalle-deduc-personal';
import { DetalleDeducPersonalService } from 'src/app/shared/utils/detalle-deduc-personal/detalle-deduc-personal.service';

@Component({
  selector: 'app-cuadrante-deducciones',
  templateUrl: './cuadrante-deducciones.component.html',
  styleUrls: ['./cuadrante-deducciones.component.css'],
})
export class CuadranteDeduccionesComponent implements OnInit {
  @ViewChild('selectDispositivo') matRef: MatSelect;

  _consultaRequest: any;
  @Input() set consultaRequest(val: any) {
    this._consultaRequest = val;
  }

  request: any;

  tablaLista: any;
  deducciones: DeduccionesFiscale[];
  tablaDeducciones: DeduccionesFiscale[];

  displayedColumns: string[] = ['clave', 'deduccion', 'requisitos', 'detalle'];
  public pager: any;
  public form: FormGroup;

  dispositivosBusqueda = [
    {
      estatus: false,
      tipo: 1,
      nombre: 'Enlaces',
    },
    {
      estatus: false,
      tipo: 1,
      nombre: 'Sitios',
    },
    {
      estatus: false,
      tipo: 1,
      nombre: 'Servicios',
    },
    {
      estatus: false,
      tipo: 2,
      nombre: 'Inactivo',
    },
    {
      estatus: false,
      tipo: 2,
      nombre: 'Activo',
    },
    {
      estatus: false,
      tipo: 2,
      nombre: 'En mantenimiento',
    },
  ];
  Options = [
    {
      nombre: 'Switch',
      icono: 'image-dispositivo-servicio',
    },
    {
      nombre: 'ONT',
      icono: 'image-dispositivo-ont',
    },
    {
      nombre: 'Radio Base',
      icono: 'image-puntas-radio',
    },
    {
      nombre: 'CPE',
      icono: 'image-dispositivo-cpe',
    },
    {
      nombre: 'Firewall',
      icono: 'image-dispositivo-estatus',
    },
    {
      nombre: 'Router',
      icono: 'image-dispositivo-sitio',
    },
  ];

  removable = true;
  selectable = true;

  constructor(
    private dialogService: DetalleDeducPersonalService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.crearForm();
    this.listaDeducciones();
  }

  crearForm() {
    this.form = this.formBuilder.group({
      buscar: [''],
      dispositivos: [''],
    });
  }

  listaDeducciones() {
    this.dashboardService.obtenerDeduccionesFiscales().subscribe(
      (response) => {
        this.deducciones = response.deduccionesFiscales;
        this.paginador(this.deducciones);
      },
      (_error) => {
        console.log('Error en catalogo: ', _error);
      }
    );
  }

  onPaged(page) {
    this.tablaDeducciones = this.pager.page(page);
  }

  paginador(value: any) {
    this.pager = new Paginator(value, 4, 1);
    if (value.length > 0) {
      this.tablaDeducciones = this.pager.page(1);
    } else {
      this.tablaDeducciones = [];
    }
  }

  openDetalleDialog(item) {
    const dialogRef = this.dialog.open(
      DetalleDeducPersonalComponent,
      this.dialogService.detalleDeducPersonal(item)
    );
  }

  send(item) {
    this.openDetalleDialog(item);
  }

  removeService(index: number, item: any) {
    this.matRef.options.forEach((data: MatOption) => {
      if (item === data.value) {
        data.deselect();
      }
    });
  }

  onKeyDownEvent(event: any) {
    let filtro = event.target.value;

    this.deducciones = this.tablaDeducciones.filter((item) =>
      item?.descripcion.toLowerCase().includes(filtro.toLowerCase())
    );
  }
}
