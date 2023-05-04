import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { DatosFiscales } from 'src/app/shared/model/dashboard.mode';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DashboardService } from 'src/app/shared/service/dashboard.service';

@Component({
  selector: 'app-datos-fiscales',
  templateUrl: './datos-fiscales.component.html',
  styleUrls: ['./datos-fiscales.component.css']
})
export class DatosFiscalesComponent implements OnInit {

  rfc: any;
  response: DatosFiscales;
  spinnerLoading: boolean = true;
  urlConstancia: any;

  constructor(
    public router: Router,
    private auth: AuthService, 
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.rfc = {
      rfc: this.auth.usuario.cliente.rfc
    }
    this.obtenerDatosFiscales();
  }

  obtenerDatosFiscales(): void {
    this.dashboardService.obtenerDatosFiscales(this.rfc).subscribe((resp) => {
      this.spinnerLoading = false;
      this.response = resp.datosFiscales;
      console.log('::DATOS FISCALES', this.response)
    },(_error) => {
      console.log("::Entro al error Datos fiscales: ", _error);
    }
    );
  }

  verConstancia(){
    this.urlConstancia  = localStorage.Constancia;
    window.open(this.urlConstancia, "_blank");
    }

    regresar(){
      this.router.navigateByUrl(NAV.perfil)
    }
}
