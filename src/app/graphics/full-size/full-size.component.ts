import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { ComprobantePeriodo } from 'src/app/shared/model/dashboard.mode';
import { DashboardService } from 'src/app/shared/service/dashboard.service';

@Component({
  selector: 'app-full-size',
  templateUrl: './full-size.component.html',
  styleUrls: ['./full-size.component.css']
})
export class FullSizeComponent implements OnInit {

  tipoDashboard: any;
  tituloDashboard: string;
  textoDashboard: string;
  spinnerLoadingIngresos: boolean = false;
  consultaRequest: any;

  gastosPeriodo: ComprobantePeriodo = new ComprobantePeriodo;
  ingresosPeriodo: ComprobantePeriodo = new ComprobantePeriodo;

  constructor(public router: Router,
    private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.tipoDashboard = localStorage.getItem('dashboard');
    this.tituloDashboard = localStorage.getItem('titulo-dashboard');
    this.textoDashboard = localStorage.getItem('texto-dashboard');
    this.consultaRequest = JSON.parse(localStorage.getItem('consulta-dashboard'))

    this.obtenerIngresosEngresos()
  }

  regresar(){
    localStorage.removeItem('dashboard')
    localStorage.removeItem('titulo-dashboard')
    localStorage.removeItem('texto-dashboard')
    this.router.navigateByUrl(NAV.dashboard);
  }

  obtenerIngresosEngresos(): void {
    this.spinnerLoadingIngresos = true;
    this.dashboardService.obtenerIngresosGastos(this.consultaRequest).subscribe(
      (response) => {
        this.ingresosPeriodo = new ComprobantePeriodo
        this.gastosPeriodo = new ComprobantePeriodo
        if(response.listaReporteIngresosEgresosBean != null){
          if(response.listaReporteIngresosEgresosBean.find((element) => element.tipoComprobante === 'INGRESOS')){
            this.ingresosPeriodo = response.listaReporteIngresosEgresosBean.find((element) => element.tipoComprobante === 'INGRESOS');
          }
          if(response.listaReporteIngresosEgresosBean.find((element) => element.tipoComprobante === 'GASTOS')){
            this.gastosPeriodo = response.listaReporteIngresosEgresosBean.find((element) => element.tipoComprobante === 'GASTOS');
          }
        }
        this.spinnerLoadingIngresos = false;
      },(_error) => {
        this.spinnerLoadingIngresos = false;
        console.log("Error: ", _error);
    });
      
  }

}
