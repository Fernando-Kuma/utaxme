import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Moment} from 'moment';
import * as moment from 'moment';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { ComprobantePeriodo } from 'src/app/shared/model/dashboard.mode';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DashboardService } from 'src/app/shared/service/dashboard.service';

@Component({
  selector: 'app-salud-fiscal',
  templateUrl: './salud-fiscal.component.html',
  styleUrls: ['./salud-fiscal.component.css']
})
export class SaludFiscalComponent implements OnInit {

  baseGravable: any = {
    ingresos: 0,
    egresos: 0,
    porcentaje: 0,
    utilidad: 0
  }

  gastosPeriodo: ComprobantePeriodo = new ComprobantePeriodo;
  ingresosPeriodo: ComprobantePeriodo = new ComprobantePeriodo;

  speedValue: any;
  tipoPeriodo: boolean = true;
  spinnerLoadingIngresos: boolean = false;
  requestDashboard: any; 
  date = new FormControl(moment());
  maxDate: Date;

  constructor(
    public router: Router,
    private auth: AuthService, 
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.maxDate = new Date(moment().set({'hours': 0,'minute': 0, 'second': 0, 'millisecond': 0}).format());
    this.cambiarRequest()
  }

  regresar(){
    this.router.navigateByUrl(NAV.dashboard)
  }

  chosenYearHandler(normalizedYear: any) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    this.cambiarRequest()
    datepicker.close();
  }

  cambiarRequest(){
    this.requestDashboard = {
      rfc: this.auth.usuario.cliente.rfc,
      mes: moment(this.date.value).format("M"),
      anio: moment(this.date.value).format("YYYY")
    }
    this.obtenerIngresosEngresos()
  }

  public get width() {
    return window.innerWidth;
  }

  calcularSpeed(){
    this.speedValue = this.baseGravable.porcentaje / 10
  }

  obtenerIngresosEngresos(): void {
    this.spinnerLoadingIngresos = true;
    this.dashboardService.obtenerIngresosGastos(this.requestDashboard).subscribe(
      (response) => {
        console.log('Res gatos: ', response);
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
