import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Paginator } from 'array-paginator';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { DetalleDeducPersonalComponent } from 'src/app/shared/utils/detalle-deduc-personal';
import { DetalleDeducPersonalService } from 'src/app/shared/utils/detalle-deduc-personal/detalle-deduc-personal.service';


export interface PeriodicElement {
  nOrden: string;
  rfcReceptor: string;
  fechaEmision: string;
  total: string;
}


@Component({
  selector: 'app-cancelar-cfdi',
  templateUrl: './cancelar-cfdi.component.html',
  styleUrls: ['./cancelar-cfdi.component.css']
})
export class CancelarCfdiComponent implements OnInit {

  ELEMENT_DATA_PERSONALES: PeriodicElement[] = [
    {
      nOrden: '16012023',
      rfcReceptor: 'XAXX010101000',
      fechaEmision: '16/01/2023',
      total: '$47,203.28',
    },{
      nOrden: '20022023',
      rfcReceptor: 'XAXX010101000',
      fechaEmision: '16/01/2023',
      total: '$47,203.28',
    },{
      nOrden: '15032023',
      rfcReceptor: 'XAXX010101000',
      fechaEmision: '16/01/2023',
      total: '$47,203.28',
    },{
      nOrden: 'FUMIGACIONES SA DE CV',
      rfcReceptor: 'XAXX010101000',
      fechaEmision: '16/01/2023',
      total: '$47,203.28',
    },{
      nOrden: 'CARMEN VILLA LORO',
      rfcReceptor: 'XAXX010101000',
      fechaEmision: '16/01/2023',
      total: '$47,203.28',
    },{
      nOrden: 'BRANDON ANGULO LOZ',
      rfcReceptor: 'XAXX010101000',
      fechaEmision: '16/01/2023',
      total: '$47,203.28',
    },{
      nOrden: '16012023',
      rfcReceptor: 'XAXX010101000',
      fechaEmision: '16/01/2023',
      total: '$47,203.28',
    },{
      nOrden: '20022023',
      rfcReceptor: 'XAXX010101000',
      fechaEmision: '16/01/2023',
      total: '$47,203.28',
    },{
      nOrden: '15032023',
      rfcReceptor: 'XAXX010101000',
      fechaEmision: '16/01/2023',
      total: '$47,203.28',
    },{
      nOrden: 'FUMIGACIONES SA DE CV',
      rfcReceptor: 'XAXX010101000',
      fechaEmision: '16/01/2023',
      total: '$47,203.28',
    },{
      nOrden: 'CARMEN VILLA LORO',
      rfcReceptor: 'XAXX010101000',
      fechaEmision: '16/01/2023',
      total: '$47,203.28',
    },{
      nOrden: 'BRANDON ANGULO LOZ',
      rfcReceptor: 'XAXX010101000',
      fechaEmision: '16/01/2023',
      total: '$47,203.28',
    },
  ]


  public form: FormGroup;
  requestDashboard: any;
  tituloProceso: string = 'Cancelar factura'
  nombreCliente: string;

  _consultaRequest: any;
  @Input() set consultaRequest(val: any) {
    this._consultaRequest = val;
  }

  request: any;

  listaResultado: any;
  displayedColumns: string[] = ['nOrden', 'rfcReceptor', 'fechaEmision', 'total', 'cancelacion'];
  public pager: any;

  verTabla: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder, 
    private dialog: MatDialog,
    private dialogService: DetalleDeducPersonalService,
  ) { }

  ngOnInit(): void {
    this.crearForm()
    this.paginador(this.ELEMENT_DATA_PERSONALES);
  }

  crearForm(){
    this.form = this.formBuilder.group({      
      inicial: [''],
      final: [''],
      numeroOrden: ['']
    });
  }

  back(){
    this.router.navigateByUrl(NAV.espacioTrabajo);
  }

  regresar(){
    this.router.navigateByUrl(NAV.dashboard)
  }

 

  onPaged(page) {
    this.listaResultado = this.pager.page(page);
  }

  paginador(value: any) {
    this.pager = new Paginator(value, 4, 1);
    this.onPaged(1);
  }

     openDetalleDialog() {
    const dialogRef = this.dialog.open(
      DetalleDeducPersonalComponent,
      this.dialogService.detalleDeducPersonal()
    );
    
  } 

  cancelar(){
    this.openDetalleDialog(); 
  }

  buscar(){
    this.verTabla = true;
  }

}
