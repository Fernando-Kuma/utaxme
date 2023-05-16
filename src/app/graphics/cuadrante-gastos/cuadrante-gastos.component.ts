import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Paginator } from 'array-paginator';
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
  size: number = 15;
  gastosPeriodo: ComprobantePeriodo = new ComprobantePeriodo;
  dateValue: Array<DateValue> = []

  public pager: any;
  _consultaRequest: any;
  
  @Input() set consultaRequest(val: any) {
    this._consultaRequest = val;
  }
  
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

    this.dateValue = []
    if(this.isFull){
      this.size = 30 * (Math.ceil(this.gastosPeriodo.facturas / 30))
    }
    if(this.gastosPeriodo.facturas > 0){
        for (var i = 0; i < this.size; i++) {
            this.dateValue.push({id:i+1, total: this.gastosPeriodo.detalles[i] ? this.gastosPeriodo.detalles[i].total : 0});
        }
    }else{
      this.dateValue = [{id: 0, total: 0}]
    }

    this.paginador(this.dateValue)
    console.log("Object Gastos:",this.dateValue);
  }

  onPaged(page) {
    this.dateValue = this.pager.page(page);
  }

  paginador(value: any) {
    this.isFull ? 
    this.pager = new Paginator(value, 30, 1) : 
    this.pager = new Paginator(value, 15, 1)
    if (value.length > 0) {
      this.dateValue = this.pager.page(1);
    } else {
      this.dateValue = [];
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
