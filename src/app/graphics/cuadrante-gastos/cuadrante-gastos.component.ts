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
  selector: 'app-cuadrante-gastos',
  templateUrl: './cuadrante-gastos.component.html',
  styleUrls: ['./cuadrante-gastos.component.css']
})
export class CuadranteGastosComponent implements OnInit {

  @Input() isFull: boolean = false;
  
  dateValue = [
    {
        "id": 1,
        "total": 0
    },
    {
        "id": 2,
        "total": 0
    },
    {
        "id": 3,
        "total": 0
    },
    {
        "id": 4,
        "total": 0
    },
    {
        "id": 5,
        "total": 0
    },
    {
        "id": 6,
        "total": 0
    }
];

  _consultaRequest: any;
  @Input() set consultaRequest(val: any) {
    this._consultaRequest = val;
  }
  
  gastosPeriodo: ComprobantePeriodo = new ComprobantePeriodo;
  @Input() set data(val: any) {
    this.gastosPeriodo = val;
    this.obtenerData()
  }

  dateValueWeek: Array<DateValue> = [
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).format()), value: 0 },
    { date: new Date(moment().set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(1, 'days').format()), value: 0 },
    { date: new Date(moment().set({'minute': 0, 'second': 0, 'millisecond': 0}).subtract(2, 'days').format()), value: 0 },
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(3, 'days').format()), value: 0 },
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(4, 'days').format()), value: 0 },
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(5, 'days').format()), value: 0 },
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(6, 'days').format()), value: 0 },
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(7, 'days').format()), value: 0 },
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(8, 'days').format()), value: 0 },
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(9, 'days').format()), value: 0 },
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(10, 'days').format()), value: 0 },
    { date: new Date(moment().set({ 'minute': 0, 'second': 0, 'millisecond': 0}).subtract(11, 'days').format()), value: 0 },
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
  
  scale: 'week' | 'day'  = 'week' ;

  constructor(
    public router: Router,
    private dashboardService: DashboardService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    
  }

  obtenerDato(){
    this.dashboardService.obtenerIngresosGastos(this._consultaRequest).subscribe({
      next: (result) => {
        this.gastosPeriodo = new ComprobantePeriodo;
        if(result.listaReporteIngresosEgresosBean.find((element) => element.tipoComprobante === 'GASTOS')){
          this.gastosPeriodo = result.listaReporteIngresosEgresosBean.find((element) => element.tipoComprobante === 'GASTOS');
        }
      },
      error: (_) => {
        console.log(_)
      }
    });
  }

  descargarExcel(){
    if(this.gastosPeriodo.total == 0){
      this.alertService.warn('<b>No hay ingresos ni egresos en este periodo.</b>');
    }else{
      this.descargarExcelPeticion()
    }
    
  }

  descargarExcelPeticion(){
    this.dashboardService.obtenerReporte(this._consultaRequest).subscribe({
      next: (response) => {
        if(response != null){
          const linkDescarga = document.createElement('a');
          const url = window.URL.createObjectURL(response);
          document.body.appendChild(linkDescarga);
          linkDescarga.setAttribute('style', 'display: none');
          linkDescarga.href = url;
          linkDescarga.download = 'Reporte_Contable_'+this._consultaRequest.rfc+"_"+ this._consultaRequest.mes+"_"+this._consultaRequest.anio+".xls";
          linkDescarga.click();
          window.URL.revokeObjectURL(url);
          linkDescarga.remove();
        }
      },
      error: (_) => {
        console.log(_)
      }
    });
  }

  obtenerData(){
    if(this.gastosPeriodo.facturas > 0){
      this.gastosPeriodo.detalles.forEach((element,index) => {
        this.dateValue[index].total = element.total;
      });
    }else{
      this.dateValue = [{id: 0, total: 0}]
    }
  }

  fullSize(){
    localStorage.setItem('dashboard','CUADRANTE-GASTOS');
    localStorage.setItem('titulo-dashboard','Factura recibidas');
    localStorage.setItem('texto-dashboard',String(this.gastosPeriodo.facturas));

    localStorage.setItem('consulta-dashboard', JSON.stringify(this._consultaRequest));
    this.router.navigateByUrl(NAV.fullSize);
  }

  public get width() {
    return window.innerWidth;
  }

}
