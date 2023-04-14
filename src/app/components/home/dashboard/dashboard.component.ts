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

  usuario: Usuario;
  datosCliente: Cliente;
  date = new FormControl(moment());
  maxDate: Date;
  requestDashboard: any;
  
  
  constructor(private auth: AuthService, private dashboardService: DashboardService) { }

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
  }


}
