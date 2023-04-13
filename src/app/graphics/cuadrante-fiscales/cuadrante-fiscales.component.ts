import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/service/dashboard.service';

@Component({
  selector: 'app-cuadrante-fiscales',
  templateUrl: './cuadrante-fiscales.component.html',
  styleUrls: ['./cuadrante-fiscales.component.css']
})
export class CuadranteFiscalesComponent implements OnInit {

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
  ) { }

  ngOnInit(): void {
    this.getDatosFiscales();
  }

  getDatosFiscales(): void {
    this.dashboardService.obtenerDatosFiscales(this.datFiscal).subscribe((resp) => {
      this.response = resp;
      /* console.log('::RESP Datos Fiscales', this.response); */
    },
        (_error) => {
          console.log("::Entro al error Datos fiscales");
        }
        );
  }

}
