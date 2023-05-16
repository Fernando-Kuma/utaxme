import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { ComprobantePeriodo } from 'src/app/shared/model/dashboard.mode';
import { DateValue } from 'src/app/shared/model/date-value';
import { MarginConf } from 'src/app/shared/model/margin-conf';
import { DashboardService } from 'src/app/shared/service/dashboard.service';
import { AlertService } from 'src/app/shared/utils/alertas';
@Component({
  selector: 'app-cuadrante-ingresos',
  templateUrl: './cuadrante-ingresos.component.html',
  styleUrls: ['./cuadrante-ingresos.component.css']
})
export class CuadranteIngresosComponent implements OnInit {

  @Input() isFull: boolean = false;

  ingresosPeriodo: ComprobantePeriodo = new ComprobantePeriodo;
  size: number = 15;
  @Input() set data(val: any) {
    this.ingresosPeriodo = val;
    this.obtenerData()
  }  

  _consultaRequest: any;
  @Input() set consultaRequest(val: any) {
    this._consultaRequest = val;
  }

  dateValue: Array<DateValue> = []

  spinnerLoading: boolean = true;

  dateValueWeek: Array<DateValue> = [
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).format()), value: 0 },
  ];


  marginBarChart?: MarginConf = {
    top: 10,
    right: 10,
    bottom: 20,
    left: 50,
  };

  marginBarChartFull?: MarginConf = {
    top: 10,
    right: 10,
    bottom: 50,
    left: 80,
  };
  
  constructor(
    public router: Router, 
    private dashboardService: DashboardService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    if(this.isFull){
      this.size = 30;
      this.consultaRequest = JSON.parse(localStorage.getItem('consulta-dashboard'))
      this.obtenerDato()
    }else{
      this.size = 15;
    }
  }

  obtenerDato(){
    this.spinnerLoading = true;
    this.dashboardService.obtenerIngresosGastos(this._consultaRequest).subscribe({
      next: (result) => {
        this.spinnerLoading = false;
        this.ingresosPeriodo = new ComprobantePeriodo;
        if(result.listaReporteIngresosEgresosBean){
          if(result.listaReporteIngresosEgresosBean.find((element) => element.tipoComprobante === 'INGRESOS')){
            this.ingresosPeriodo = result.listaReporteIngresosEgresosBean.find((element) => element.tipoComprobante === 'INGRESOS');
          }
        }
        this.obtenerData()
      },
      error: (_) => {
        console.log(_)
      }
    });
  }

  obtenerData(){
    if(this.ingresosPeriodo.facturas > 0){
        for (var i = 0; i < this.size; i++) {
            this.dateValue.push({id:i+1, total: this.ingresosPeriodo.detalles[i] ? this.ingresosPeriodo.detalles[i].total : 0});
        }
    }else{
      this.dateValue = [{id: 0, total: 0}]
    }
    console.log("Object:",this.dateValue);
  }

  public get width() {
    return window.innerWidth;
  }

  fullSize(){
    localStorage.setItem('dashboard','CUADRANTE-INGRESOS');
    localStorage.setItem('titulo-dashboard','Factura emitidas');
    localStorage.setItem('texto-dashboard',String(this.ingresosPeriodo.facturas));

    localStorage.setItem('consulta-dashboard', JSON.stringify(this._consultaRequest));
    this.router.navigateByUrl(NAV.fullSize);
  }

}
