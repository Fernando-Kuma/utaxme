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
  consultaRequest: any;

  constructor(
    public router: Router,
    private auth: AuthService, 
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {

    this.consultaRequest = JSON.parse(localStorage.getItem('consulta-dashboard'))
    
  }

  regresar(){
    this.router.navigateByUrl(NAV.dashboard)
  }

}
