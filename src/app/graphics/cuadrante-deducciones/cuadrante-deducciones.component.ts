import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Paginator } from 'array-paginator';
import { DeduccionesFiscale } from 'src/app/shared/model/dashboard.mode';
import { DashboardService } from 'src/app/shared/service/dashboard.service';
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
      nombre: 'Anual',
    },
    {
      estatus: false,
      tipo: 2,
      nombre: 'Mensual',
    },
  ];
  Options = [
    {
      nombre: 'Salud',
      icono: 'image-salud',
    },
    {
      nombre: 'Educacion',
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
    this.pager = new Paginator(value, 3, 1);
    if (value.length > 0) {
      this.tablaDeducciones = this.pager.page(1);
    } else {
      this.tablaDeducciones = [];
    }
  }

  openDetalleDialog(item) {
    this.dialog.open(
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
    if(filtro.length > 2 ){
      this.deduccionesBusqueda.forEach(element => {
        element.estatus = false;
      });
      this.tablaDeducciones = this.deducciones.filter((item) =>
        item?.descripcion.toLowerCase().includes(filtro.toLowerCase())
      );
      this.paginador(this.tablaDeducciones);
    }else{
      this.tablaDeducciones = this.deducciones;
      this.paginador(this.tablaDeducciones);
    }
  }


  filtrarDeducciones() {
    this.form.get('buscar').setValue("");
    console.log(this.deduccionesBusqueda);
    let aplica = [];
    this.deduccionesBusqueda.forEach(element => {
      if(element.estatus === true){
        aplica.push(element.nombre);
      }
    });
    let tipo = this.form.controls['dispositivos'].value ?  this.form.controls['dispositivos'].value : [];

    if(aplica.length == 0 && tipo.length == 0){
      this.tablaDeducciones = this.deducciones;
    }else{
      console.log("tipos seleccionados:",tipo);
      console.log("aplica seleccionados:",aplica);
      this.tablaDeducciones =this.deducciones.filter((item) =>
        item?.aplica.toLowerCase().includes(aplica[0]?.toLowerCase()) || item?.aplica.toLowerCase().includes(aplica[1]?.toLowerCase()) || item?.aplica.toLowerCase().includes(aplica[2]?.toLowerCase()) || item?.aplica.toLowerCase().includes(aplica[3]?.toLowerCase())
        || item?.tipo.toLowerCase().includes(tipo[0]?.toLowerCase()) || item?.tipo.toLowerCase().includes(tipo[1]?.toLowerCase()) || item?.tipo.toLowerCase().includes(tipo[2]?.toLowerCase()) || item?.tipo.toLowerCase().includes(tipo[3]?.toLowerCase()) 
        || item?.tipo.toLowerCase().includes(tipo[4]?.toLowerCase()) || item?.tipo.toLowerCase().includes(tipo[5]?.toLowerCase())
      );
    }
    this.paginador(this.tablaDeducciones);
  }

  returnFilter(){
    this.form.reset();
    this.paginador(this.deducciones);
    this.borrarFiltro(3)
  }
}
