import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DashboardService } from 'src/app/shared/service/dashboard.service';

@Component({
  selector: 'app-cuadrante-fiscales',
  templateUrl: './cuadrante-fiscales.component.html',
  styleUrls: ['./cuadrante-fiscales.component.css']
})
export class CuadranteFiscalesComponent implements OnInit {

  _consultaFecha: any;
  @Input() set consultaFecha(val: any) {
    this._consultaFecha = val;
    this.request.anio= this._consultaFecha?.anio,
    this.request.mes= this._consultaFecha?.mes,
    this.obtenerIngresosEngresos();
  }
  request: any;

  response: any;
  datFiscal: any = {
    rfc: 'OATP9611061C4',
  };
  
  
  ingresos:any = {
    egresos: 1990,
    ingresos: 14697,
    data: [{
      egresos: 40,
      ingresos: 60,
    }]
  }

  speedValue: number = 6;

  constructor(
    private dashboardService: DashboardService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.request = {
        rfc: 'OATP9611061C4',
        anio: this._consultaFecha?.anio,
        mes: this._consultaFecha?.mes
    }
    this.obtenerDatosFiscales();
    this.obtenerIngresosEngresos();
  }

  obtenerDatosFiscales(): void {
    this.dashboardService.obtenerDatosFiscales(this.datFiscal).subscribe((resp) => {
      this.response = resp;
      /* console.log('::RESP Datos Fiscales', this.response); */
    },
        (_error) => {
          console.log("::Entro al error Datos fiscales");
        }
        );
  }

  obtenerIngresosEngresos(): void {
    this.dashboardService.obtenerIngresosGastos(this.request).subscribe(
      (response) => {
        console.log('Res gatos: ', response);
      },(_error) => {
        console.log("Error: ", _error);
      });
  }

}
