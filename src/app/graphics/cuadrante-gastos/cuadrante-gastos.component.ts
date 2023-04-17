import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { ComprobantePeriodo } from 'src/app/shared/model/dashboard.mode';
import { DateValue } from 'src/app/shared/model/date-value';
import { MarginConf } from 'src/app/shared/model/margin-conf';
import { DashboardService } from 'src/app/shared/service/dashboard.service';

@Component({
  selector: 'app-cuadrante-gastos',
  templateUrl: './cuadrante-gastos.component.html',
  styleUrls: ['./cuadrante-gastos.component.css']
})
export class CuadranteGastosComponent implements OnInit {

  _consultaRequest: any;
  @Input() set consultaRequest(val: any) {
    this._consultaRequest = val;
    this.obtenerDato();
  }
  gastosIngresos: any;
  gastosPeriodo: ComprobantePeriodo;

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
    bottom: 5,
    left: 35,
  };

  scale: 'week' | 'day'  = 'week' ;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    
  }

  obtenerDato(){
    this.dashboardService.obtenerIngresosGastos(this._consultaRequest).subscribe({
      next: (result) => {
        this.gastosIngresos = result.listaReporteIngresosEgresosBean
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
    if(this.gastosIngresos[0].total == 0 && this.gastosIngresos[1].total == 0 ){
      console.log("No hay ingresos ni egresos en este periodo.")
    }else{
      this.descargarExcelPeticion()
    }
    
  }

  descargarExcelPeticion(){
    this.dashboardService.obtenerReporte(this._consultaRequest).subscribe({
      next: (response) => {
        if(response != null){
          console.log(response);

          /* const url = window.URL.createObjectURL(new Blob([response.data], {type:'application/vnd.ms-excel'}));
          const link = document.createElement('a');
          link.href = url;

          link.setAttribute('download', 'Reporte_Contable_'+this.$store.state.cliente.rfc+"_"+ this.mes+"_"+this.anio+".xls");
          document.body.appendChild(link);
          link.click(); */
          //console.log(response.data)

          const timeStamp = moment().format('YYYYMMDDHHmmss');
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

}
