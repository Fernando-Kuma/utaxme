import { Component, OnInit } from '@angular/core';
import { Cliente, Usuario } from 'src/app/shared/model/usuario.model';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';


import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment} from 'moment';
import { DashboardService } from 'src/app/shared/service/dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactoComponent } from 'src/app/shared/utils/contacto';
import { ContactoService } from 'src/app/shared/utils/contacto/contacto.service';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { ComprobantePeriodo, CumplimientoFiscal } from 'src/app/shared/model/dashboard.mode';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL', 
  },
  display: {
    dateInput: 'YYYY - MM', // this is the format showing on the input element
    monthYearLabel: 'YYYY - MM', // this is showing on the calendar 
  },
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DashboardComponent implements OnInit {


  cumplimientoFiscal: CumplimientoFiscal
  gastosPeriodo: ComprobantePeriodo = new ComprobantePeriodo;
  ingresosPeriodo: ComprobantePeriodo = new ComprobantePeriodo;

  usuario: Usuario;
  datosCliente: Cliente;
  date = new FormControl(moment());
  maxDate: Date;
  requestDashboard: any;

  spinnerLoadingIngresos: boolean = false;
  spinnerLoadingCumplimiento: boolean = false;
  
  
  constructor(
    private auth: AuthService, 
    private dashboardService: DashboardService, 
    private dialog: MatDialog, 
    private dialogService: ContactoService,
    private router: Router) { }

  ngOnInit(): void {
    this.usuario = this.auth.usuario 
    if(this.usuario == null){
      this.auth.logout()
    }
    this.maxDate = new Date(moment().set({'hours': 0,'minute': 0, 'second': 0, 'millisecond': 0}).format());
    this.cambiarRequest()
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
    this.obtenerCumplimientoFiscal()
  }

  crearFactura(){
    this.router.navigateByUrl(NAV.crearCfdi)
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

  obtenerCumplimientoFiscal(): void {
    this.spinnerLoadingCumplimiento = true;
    this.dashboardService.obtenerCumplimientoFiscal(this.requestDashboard).subscribe((resp) => {
      let mes = moment(resp.anio + '-' + resp.mes)
      mes.locale('es')
      let mesString = mes.format('MMMM');
      resp.mes = mesString
      resp.estatus = resp.estatus.toLowerCase()
      this.cumplimientoFiscal = resp;
      this.cumplimientoFiscal.listDocumentos.forEach(element => {
        if(element.tipo === 'OPINION'){ 
          localStorage.Opinion = element.url;
        }
        if(element.tipo === 'CONSTANCIA'){ 
          localStorage.Constancia = element.url;
        }
        if(element.tipo === 'ACUSE'){ 
          localStorage.Acuse = element.url;
        }
      });
      if(this.auth.usuario.cliente.rfc === 'OATP9611061C4'){
        localStorage.Acuse = "https://www.billerticket.com/store/OATP9611061C4/ACUSE_RECIBO_OATP9611061C4_ENE_FEB_2023_IVA.pdf";
      }
      this.spinnerLoadingCumplimiento = false;
    },
        (_error) => {
          this.spinnerLoadingCumplimiento = false;
          console.log("::Entro al error Cumplimiento");
        }
      );
  }

  openDetalleDialog() {
    const dialogRef = this.dialog.open(
      ContactoComponent,
      this.dialogService.contacto()
    );
    
  }

  nuevaFactura(){
    this.router.navigateByUrl(NAV.generarCfdi);
  }
  
  contacto(){
    this.openDetalleDialog(); 
  }

  cancelarFactura(){
    this.router.navigateByUrl(NAV.cancelarCfdi);
  }
}
