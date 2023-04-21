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

  urlOpinion: any;
  urlConstancia: any;
  urlAcuse: any;
  spinnerLoading: boolean = true;

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    
  }

  getCumplimientoFiscal(): void {
    this.spinnerLoading = true
    this.dashboardService.obtenerCumplimientoFiscal(this._consultaRequest).subscribe((resp) => {
      let mes = moment(resp.anio + '-' + resp.mes)
      mes.locale('es')
      let mesString = mes.format('MMMM');
      resp.mes = mesString
      resp.estatus = resp.estatus.toLowerCase()
      this.response = resp;
      this.urlOpinion = this.response.listDocumentos[0].url;
      this.urlConstancia = this.response.listDocumentos[1].url;
      localStorage.Constancia = this.response.listDocumentos[1].url;
      this.spinnerLoading = false
    },
        (_error) => {
          console.log("::Entro al error Cumplimiento");
        }
        );
  }


  verOpinion(){
    window.open(this.urlOpinion, "_blank");
  }

  verConstancia(){
  window.open(this.urlConstancia, "_blank");
  }

  verAcuse() {
    window.open('https://www.billerticket.com/store/OATP9611061C4/ACUSE_RECIBO_OATP9611061C4_ENE_FEB_2023_IVA.pdf', "_blank");
    /* alert('No se encontro el acuse'); */
  }
}
