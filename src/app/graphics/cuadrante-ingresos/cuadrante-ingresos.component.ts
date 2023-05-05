import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { ComprobantePeriodo } from 'src/app/shared/model/dashboard.mode';
import { DateValue } from 'src/app/shared/model/date-value';
import { MarginConf } from 'src/app/shared/model/margin-conf';
import { DashboardService } from 'src/app/shared/service/dashboard.service';
@Component({
  selector: 'app-cuadrante-ingresos',
  templateUrl: './cuadrante-ingresos.component.html',
  styleUrls: ['./cuadrante-ingresos.component.css']
})
export class CuadranteIngresosComponent implements OnInit {

  @Input() isFull: boolean = false;
  
  _consultaRequest: any;
  @Input() set consultaRequest(val: any) {
    this._consultaRequest = val;
    this.obtenerDato();
  }

  ingresosPeriodo: ComprobantePeriodo = new ComprobantePeriodo;
  @Input() set data(val: any) {
    this.ingresosPeriodo = val;
    this.obtenerData()
    console.log(this.ingresosPeriodo);
  }  

  dateValue: Array<DateValue> = []

  spinnerLoading: boolean = true;

  dateValueWeek: Array<DateValue> = [
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).format()), value: 0 },
    { date: new Date(moment().set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(1, 'days').format()), value: 0 },
    { date: new Date(moment().set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(2, 'days').format()), value: 0 },
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(3, 'days').format()), value: 0 },
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(4, 'days').format()), value: 0 },
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(5, 'days').format()), value: 0 },
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(6, 'days').format()), value: 0 },
  ];


  marginBarChart?: MarginConf = {
    top: 10,
    right: 10,
    bottom: 5,
    left: 50,
  };

  scale: 'week' | 'day'  = 'week' ;
  constructor(public router: Router, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    
  }

  obtenerDato(){
    this.spinnerLoading = true;
    this.dashboardService.obtenerIngresosGastos(this._consultaRequest).subscribe({
      next: (result) => {
        this.spinnerLoading = false;
        this.ingresosPeriodo = new ComprobantePeriodo;
        if(result.listaReporteIngresosEgresosBean.find((element) => element.tipoComprobante === 'INGRESOS')){
          this.ingresosPeriodo = result.listaReporteIngresosEgresosBean.find((element) => element.tipoComprobante === 'INGRESOS');
        }
        
      },
      error: (_) => {
        console.log(_)
      }
    });
  }

  obtenerData(){
    this.dateValue = []
    this.ingresosPeriodo.detalles.forEach((element, index) => {
      this.dateValue.push({id: index+1, total: element.total })
    });
  }

  public get width() {
    return window.innerWidth;
  }

  fullSize(){
    localStorage.setItem('dashboard','CUADRANTE-INGRESOS');
    localStorage.setItem('titulo-dashboard','Factura emitidas');
    localStorage.setItem('texto-dashboard',String(this.ingresosPeriodo.facturas));
    this.router.navigateByUrl(NAV.fullSize);
  }

}
