import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/service/dashboard.service';

@Component({
  selector: 'app-cuadrante-cumplimiento',
  templateUrl: './cuadrante-cumplimiento.component.html',
  styleUrls: ['./cuadrante-cumplimiento.component.css']
})
export class CuadranteCumplimientoComponent implements OnInit {


  datFiscal: any = {
    rfc: 'OATP9611061C4',
    anio: 2022,
    mes: 4
  };

  public tipoDeclaracion: string = 'Mensual';
  public response: any;
   

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.getCumplimientoFiscal();
  }

  getCumplimientoFiscal(): void {
    this.dashboardService.obtenerCumplimientoFiscal(this.datFiscal).subscribe((resp) => {
      this.response = resp;
      /* console.log('::RESP Cumplimiento', this.response); */
    },
        (_error) => {
          console.log("::Entro al error Cumplimiento");
        }
        );
  }



}
