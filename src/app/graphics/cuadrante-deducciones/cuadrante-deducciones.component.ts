import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Paginator } from 'array-paginator';
import { ConfirmDialogComponent } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.component';
import { DetalleDeducPersonalComponent } from 'src/app/shared/utils/detalle-deduc-personal';
import { DetalleDeducPersonalService } from 'src/app/shared/utils/detalle-deduc-personal/detalle-deduc-personal.service';

export interface PeriodicElement {
  deduccion: string;
  clave: string;
  requisitos: string;
}

  

@Component({
  selector: 'app-cuadrante-deducciones',
  templateUrl: './cuadrante-deducciones.component.html',
  styleUrls: ['./cuadrante-deducciones.component.css'],
})
export class CuadranteDeduccionesComponent implements OnInit {

  ELEMENT_DATA_PERSONALES: PeriodicElement[] = [
    {
      clave: 'D01',
      deduccion: 'Honorarios médicos, dentales y gastos hospitalarios',
      requisitos: 'Son los Honorarios médicos y medicamentos utilizados en hospitalizaciones, exceptuado medicamentos comprados en farmacias',
    },{
      clave: 'D02',
      deduccion: 'Gastos médicos por incapacidad o discapacidad',
      requisitos: 'Este uso del CFDI se le dará cuando realicen un gasto por ejemplo la compra de una silla de ruedas.',
    },{
      clave: 'D03',
      deduccion: 'Gastos funerales',
      requisitos: 'Los gastos para cubrir funerales a futuro, serán deducibles en el año de calendario en que se utilicen los servicios funerales',
    },{
      clave: 'D04',
      deduccion: 'Donativos',
      requisitos: 'Las Donaciones deben cumplir con lo estipulado por la ley para considerarse deducibles.',
    },{
      clave: 'D05',
      deduccion: 'Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación)',
      requisitos: 'Son los intereses que se pagan por parte del contribuyente a las instituciones de crédito, por ejemplo, el Infonavit.',
    },{
      clave: 'D06',
      deduccion: 'Aportaciones voluntarias al SAR',
      requisitos: 'Aportaciones personales y voluntarias a tu cuenta del Sistema de Ahorro para el Retiro (SAR).',
    },{
      clave: 'D07',
      deduccion: 'Primas por seguros de gastos médicos',
      requisitos: 'Para la compra de un Seguro de Gastos Médicos Mayores (SGMM), el comprobante deberá contener este concepto según el catálogo.',
    },{
      clave: 'D08',
      deduccion: 'Gastos de transportación escolar obligatoria',
      requisitos: 'Si realizas pagos por colegiatura y es obligatorio el pago de transporte.',
    },{
      clave: 'D09',
      deduccion: 'Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones',
      requisitos: 'Pago de otros planes de retiro que no sean del SAR',
    },{
      clave: 'D10',
      deduccion: 'Pagos por servicios educativos (colegiaturas)',
      requisitos: 'Pagos de las colegiaturas de Preescolar, Primaria, Secundaria, Profesional Técnico o Bachillerato. Excluidos pagos adicionales a las colegiaturas, como inscripciones, reinscripciones, útiles y uniformes.',
    },
  ]

  ELEMENT_DATA_AUTORIZADAS: PeriodicElement[] = [
    {
      clave: 'G01',
      deduccion: 'Adquisición de mercancías',
      requisitos: 'Compras nacionales destinadas a la venta.',
    },{
      clave: 'G02',
      deduccion: 'Devoluciones, descuentos o bonificaciones',
      requisitos: 'Por lo regular estos conceptos se utilizan en los Comprobantes Fiscales Digitales por Internet cuando necesitamos una Nota de Crédito.',
    },{
      clave: 'G03',
      deduccion: 'Gastos en general',
      requisitos: 'Cuando el uso de la factura no se especifique en algún otro concepto del catálogo y el uso del CFDI sea para un gasto.',
    },{
      clave: 'I01',
      deduccion: 'Construcciones',
      requisitos: 'Adquisición, construcciones nuevas, ampliaciones y mejoras permanentes, que no sean reparaciones o mantenimiento.',
    },{
      clave: 'I02',
      deduccion: 'Mobiliario y equipo de oficina por inversiones',
      requisitos: 'Escritorio, sillas, muebles, estantes, etc',
    },{
      clave: 'I03',
      deduccion: 'Equipo de transporte',
      requisitos: 'Automóviles',
    },{
      clave: 'I04',
      deduccion: 'Equipo de cómputo y accesorios',
      requisitos: 'Computadoras de escritorio y portátiles, impresoras, servidores, discos duros, etc',
    },{
      clave: 'I05',
      deduccion: 'Dados, troqueles, moldes, matrices y herramental',
      requisitos: 'Es un concepto muy específico de este nuevo catálogo.',
    },{
      clave: 'I06',
      deduccion: 'Comunicaciones telefónicas',
      requisitos: 'Telefonía fija y celular, radio, Internet.',
    },{
      clave: 'I07',
      deduccion: 'Comunicaciones satelitales',
      requisitos: 'Cuando contraten servicios de telefonía o Internet satelital.',
    },{
      clave: 'I08',
      deduccion: 'Otra maquinaria y equipo',
      requisitos: 'Maquinaria usada en la elaboración de productos.',
    },{
      clave: 'P01',
      deduccion: 'Por definir',
      requisitos: 'Se emplea cuando el CFDI es en pago en parcialidades o diferido.',
    }
  ]

  _consultaRequest: any;
  @Input() set consultaRequest(val: any) {
    this._consultaRequest = val;
    //this.obtenerIngresosEngresos();
  }

  request: any;

  listaResultado: any;
  displayedColumns: string[] = ['clave', 'deduccion', 'requisitos', 'detalle'];
  public pager: any;

  constructor(
    private dialogService: DetalleDeducPersonalService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    
    this.paginador(this.ELEMENT_DATA_PERSONALES);
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

  send(){
    this.openDetalleDialog(); 
  }

  cambiarTabla(event){
    console.log()
    if(event.index == 0){
      this.paginador(this.ELEMENT_DATA_PERSONALES);
    }
    if(event.index == 1){
      this.paginador(this.ELEMENT_DATA_AUTORIZADAS);
    }
  }
}
