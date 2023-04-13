import { Component, OnInit } from '@angular/core';
import { Paginator } from 'array-paginator';

export interface PeriodicElement {
  deduccion: string;
  clave: string;
  requisitos: string;
  detalle: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    clave: 'D01',
    deduccion: 'Honorarios médicos, dentales y gastos hospitalarios',
    requisitos: 'Que sea pagada con un medio electrónico',
    detalle: 'H',
  },
  {
    clave: 'D02',
    deduccion: 'Gastos funerarios',
    requisitos: 'No incluye gastos funerarios futuros',
    detalle: 'He',
  },
  {
    clave: 'D03',
    deduccion: 'Donativos',
    requisitos: 'Debe ser emitido por una donataria autorizada',
    detalle: 'Li',
  },
  {
    clave: 'D04',
    deduccion:
      'Intereses reales efectivamente pagados por créditos hipotecarios ',
    requisitos: 'Deben ser realizados antes de presentar la declaración anual',
    detalle: 'Be',
  },
  {
    clave: 'D05',
    deduccion: 'Aportaciones voluntarias SAR',
    requisitos: 'Deben ser realizados directamente a su subcuenta',
    detalle: 'B',
  },
  {
    clave: 'D06',
    deduccion: 'Honorarios médicos, dentales y gastos hospitalarios',
    requisitos: 'Que sea pagada con un medio electrónico',
    detalle: 'H',
  },
  {
    clave: 'D07',
    deduccion: 'Gastos funerarios',
    requisitos: 'No incluye gastos funerarios futuros',
    detalle: 'He',
  },
  {
    clave: 'D08',
    deduccion: 'Donativos',
    requisitos: 'Debe ser emitido por una donataria autorizada',
    detalle: 'Li',
  },
  {
    clave: 'D09',
    deduccion:
      'Intereses reales efectivamente pagados por créditos hipotecarios ',
    requisitos: 'Deben ser realizados antes de presentar la declaración anual',
    detalle: 'Be',
  },
  {
    clave: 'D010',
    deduccion: 'Aportaciones voluntarias SAR',
    requisitos: 'Deben ser realizados directamente a su subcuenta',
    detalle: 'B',
  },
  {
    clave: 'D011',
    deduccion:
      'Intereses reales efectivamente pagados por créditos hipotecarios ',
    requisitos: 'Deben ser realizados antes de presentar la declaración anual',
    detalle: 'Be',
  },
  {
    clave: 'D012',
    deduccion: 'Aportaciones voluntarias SAR',
    requisitos: 'Deben ser realizados directamente a su subcuenta',
    detalle: 'B',
  },
  {
    clave: 'D013',
    deduccion: 'Honorarios médicos, dentales y gastos hospitalarios',
    requisitos: 'Que sea pagada con un medio electrónico',
    detalle: 'H',
  },
  {
    clave: 'D014',
    deduccion: 'Gastos funerarios',
    requisitos: 'No incluye gastos funerarios futuros',
    detalle: 'He',
  },
  {
    clave: 'D015',
    deduccion: 'Donativos',
    requisitos: 'Debe ser emitido por una donataria autorizada',
    detalle: 'Li',
  },
  {
    clave: 'D016',
    deduccion:
      'Intereses reales efectivamente pagados por créditos hipotecarios ',
    requisitos: 'Deben ser realizados antes de presentar la declaración anual',
    detalle: 'Be',
  },
  {
    clave: 'D017',
    deduccion: 'Aportaciones voluntarias SAR',
    requisitos: 'Deben ser realizados directamente a su subcuenta',
    detalle: 'B',
  },
];

@Component({
  selector: 'app-cuadrante-deducciones',
  templateUrl: './cuadrante-deducciones.component.html',
  styleUrls: ['./cuadrante-deducciones.component.css'],
})
export class CuadranteDeduccionesComponent implements OnInit {
  listaResultado = ELEMENT_DATA;
  displayedColumns: string[] = ['clave', 'deduccion', 'requisitos', 'detalle'];
  public pager: any;

  constructor() {}

  ngOnInit(): void {
    this.paginador(this.listaResultado);
  }

  onPaged(page) {
    this.listaResultado = this.pager.page(page);
  }

  paginador(value: any) {
    this.pager = new Paginator(value, 5, 1);
    this.onPaged(1);
  }
}
