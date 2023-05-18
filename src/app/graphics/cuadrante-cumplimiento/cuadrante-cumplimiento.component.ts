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

  response: CumplimientoFiscal;
  mes: string;
  @Input() set data(val: any) {
    this.response = val;
  }
  public tipoDeclaracion: string = 'Mensual';


  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.mes = new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(new Date(this.response.anio,(Number(this.response.mes) -1), 1));
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
}
