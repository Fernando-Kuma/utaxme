import { Component, OnInit, Input } from '@angular/core';
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
import { AlertService } from 'src/app/shared/utils/alertas';
import { ServiceErrorDialogComponent } from 'src/app/shared/utils/service-error-dialog/service-error-dialog.component';
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
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
  ],
})
export class DashboardComponent implements OnInit {

  _consultaRequest: any;
  @Input() set consultaRequest(val: any) {
    this._consultaRequest = val;
  }

  cumplimientoFiscal: CumplimientoFiscal
  gastosPeriodo: ComprobantePeriodo = new ComprobantePeriodo;
  ingresosPeriodo: ComprobantePeriodo = new ComprobantePeriodo;

  usuario: Usuario;
  datosCliente: Cliente;
  date = new FormControl(new Date());
  maxDate: Date;
  requestDashboard: any;

  spinnerLoadingIngresos: boolean = false;
  spinnerLoadingCumplimiento: boolean = false;

  ultimaActualizacion: any;
  
  
  constructor(
    private alertService: AlertService,
    private auth: AuthService, 
    private dashboardService: DashboardService, 
    private dialog: MatDialog, 
    private dialogService: ContactoService,
    private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('back-return');
    this.usuario = this.auth.usuario 
    if(this.usuario == null){
      this.auth.logout()
    }
    let consultaFull = JSON.parse(localStorage.getItem('consulta-dashboard')) 
    if(consultaFull != null){
      console.log("Fecha completa:",consultaFull.anio +"-"+consultaFull.mes+"-01")
      this.date.setValue(moment(consultaFull.anio +"-"+consultaFull.mes+"-01"));
    }
    this.maxDate = new Date();
    this.cambiarRequest()
    this.validarPantalla()
    
    this.ultimaActualizacion = moment().format('D MMM hh:mm a')
  }


  validarPantalla(){
    let pantallaAncho = window.innerWidth
    console.log(pantallaAncho)
    if(pantallaAncho < 1200 && pantallaAncho > 450){
      const dialogRef = this.dialog.open(ServiceErrorDialogComponent, {
        width: '420px',
        height: '415px ',
        data:{tipoError: "servicio"},
        disableClose: true
      });
  
      dialogRef.afterClosed().subscribe((data) => {
        if(data == false){
          this.auth.logout()
        }
      });
    }
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    datepicker.close();
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedMonth.year());
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    this.cambiarRequest()
  }

  cambiarRequest(){
    this.requestDashboard = {
      rfc: this.auth.usuario.cliente.rfc,
      mes: moment(this.date.value).format("MM"),
      anio: moment(this.date.value).format("YYYY")
    }
 
    console.log('requestDashboard:' ,this.requestDashboard);
    this.obtenerIngresosEngresos()
    this.obtenerCumplimientoFiscal()
  }

  obtenerIngresosEngresos(): void {
    this.spinnerLoadingIngresos = true;
    localStorage.setItem('consulta-dashboard', JSON.stringify(this.requestDashboard));
    this.dashboardService.obtenerIngresosGastos(this.requestDashboard).subscribe(
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

  obtenerCumplimientoFiscal(): void {
    this.spinnerLoadingCumplimiento = true;
    this.dashboardService.obtenerCumplimientoFiscal(this.requestDashboard).subscribe((resp : CumplimientoFiscal) => {
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
    this.dialog.open(
      ContactoComponent,
      this.dialogService.contacto()
    );
  }

  nuevaFactura(){
    localStorage.setItem('back-return', 'home');
    this.router.navigateByUrl(NAV.generarCfdi);
  }
  
  contacto(){
    this.openDetalleDialog(); 
  }

  cancelarFactura(){
    localStorage.setItem('back-return', 'home');
    this.router.navigateByUrl(NAV.cancelarCfdi);
  }


  verOpinion(){
    let urlOpinion = localStorage.Opinion;
    if(urlOpinion != null){
      window.open(urlOpinion, "_blank");
    }else{
      this.openSnackBar()
    }
  }

  verAcuse(){
    let urlAcuse = localStorage.Acuse;
    if(urlAcuse != null){
      window.open(urlAcuse, "_blank");
    }else{
      this.openSnackBar()
    }
  }

  openSnackBar() {
    alert('No se encontro el acuse');
  }

  descargarExcel(){
    if(this.gastosPeriodo.total == 0){
      this.alertService.warn('<b>No hay ingresos ni egresos en este periodo.</b>');
    }else{
      this.descargarExcelPeticion()
    }
    
  }

  descargarExcelPeticion(){
    this.dashboardService.obtenerReporte(this.requestDashboard).subscribe({
      next: (response) => {
        if(response != null){
          const linkDescarga = document.createElement('a');
          const url = window.URL.createObjectURL(response);
          document.body.appendChild(linkDescarga);
          linkDescarga.setAttribute('style', 'display: none');
          linkDescarga.href = url;
          linkDescarga.download = 'Reporte_Contable_'+this.requestDashboard.rfc+"_"+ this.requestDashboard.mes+"_"+this.requestDashboard.anio+".xls";
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
