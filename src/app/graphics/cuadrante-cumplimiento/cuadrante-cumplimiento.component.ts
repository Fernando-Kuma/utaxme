import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { ES_MX_LOCALE } from 'src/app/shared/helper/es-mx-locale';
import { CumplimientoFiscal } from 'src/app/shared/model/dashboard.mode';
import { DashboardService } from 'src/app/shared/service/dashboard.service';

@Component({
  selector: 'app-cuadrante-cumplimiento',
  templateUrl: './cuadrante-cumplimiento.component.html',
  styleUrls: ['./cuadrante-cumplimiento.component.css']
})
export class CuadranteCumplimientoComponent implements OnInit {

  _consultaRequest: any;
  @Input() set consultaRequest(val: any) {
    this._consultaRequest = val;
    this.getCumplimientoFiscal();
  }


  public tipoDeclaracion: string = 'Mensual';
  response: CumplimientoFiscal;
   

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    
  }

  getCumplimientoFiscal(): void {
    this.dashboardService.obtenerCumplimientoFiscal(this._consultaRequest).subscribe((resp) => {
      /* console.log('::RESP Cumplimiento', this.response); */
      let mes = moment(resp.anio + '-' + resp.mes)
      mes.locale('es')
      let mesString = mes.format('MMMM');
      resp.mes = mesString
      resp.estatus = resp.estatus.toLowerCase()
      this.response = resp;

    },
        (_error) => {
          console.log("::Entro al error Cumplimiento");
        }
        );
  }



}
