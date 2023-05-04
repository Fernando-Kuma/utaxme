import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment} from 'moment';
import * as moment from 'moment';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-salud-fiscal',
  templateUrl: './salud-fiscal.component.html',
  styleUrls: ['./salud-fiscal.component.css']
})
export class SaludFiscalComponent implements OnInit {

  requestDashboard: any; 
  date = new FormControl(moment());
  maxDate: Date;

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.maxDate = new Date(moment().set({'hours': 0,'minute': 0, 'second': 0, 'millisecond': 0}).format());
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
