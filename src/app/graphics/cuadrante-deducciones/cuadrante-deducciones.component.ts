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

  /* displayedColumns: string[] = ['clave', 'deduccion', 'requisitos', 'detalle']; */
  public pager: any;
  public form: FormGroup;

  deduccionesBusqueda = [
    {
      estatus: false,
      tipo: 1,
      nombre: 'Personales',
    },
    {
      estatus: false,
      tipo: 1,
      nombre: 'Autorizadas',
    },
    {
      estatus: false,
      tipo: 1,
      nombre: 'Anuales',
    },
    {
      estatus: false,
      tipo: 2,
      nombre: 'Mensuales',
    },
  ];
  Options = [
    {
      nombre: 'Salud',
      icono: 'image-salud',
    },
    {
      nombre: 'Educación',
      icono: 'image-educacion',
    },
    {
      nombre: 'Funerarios',
      icono: 'image-funerario',
    },
    {
      nombre: 'Hipotecarios',
      icono: 'image-hipotecario',
    },
    {
      nombre: 'Donativos',
      icono: 'image-donativo',
    },
    {
      nombre: 'Aportaciones',
      icono: 'image-aportacion',
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

  borrarFiltro(condition: number, event?: any){
    if(event){
      event.stopPropagation();
    }
    if(condition == 1 ){
      this.deduccionesBusqueda.forEach(element => {
        element.estatus = false;
      });
    }else if(condition == 2){
      this.form.get('deduccion').setValue([]);
    }else if(condition == 3){
      this.deduccionesBusqueda.forEach(element => {
        element.estatus = false;
      });
      this.form.get('deduccion').setValue([]);
    }
  }

  onKeyDownEvent(event: any) {
    let filtro = event.target.value;

    this.deducciones = this.tablaDeducciones.filter((item) =>
      item?.descripcion.toLowerCase().includes(filtro.toLowerCase())
    );
  }
}
