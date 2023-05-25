import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { DatosFiscales } from 'src/app/shared/model/dashboard.mode';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DashboardService } from 'src/app/shared/service/dashboard.service';
import { EspacioTrabajoService } from 'src/app/shared/service/espacio-trabajo.service';

@Component({
  selector: 'app-cuadrante-fiscales',
  templateUrl: './cuadrante-fiscales.component.html',
  styleUrls: ['./cuadrante-fiscales.component.css']
})
export class CuadranteFiscalesComponent implements OnInit {

  _consultaRequest: any;
  positionText: number[];
  ringWidth: number;
  regimenFiscal: any;
  @Input() set consultaRequest(val: any) {
    this._consultaRequest = val;
    this.fechaActual =  moment(val.anio + '-' +val.mes + '-01').locale('es').format('MMMM YYYY')
    
    console.log(this.fechaActual)
    this.obtenerRegimen()
  }

  baseGravable: any = {
    ingresos: 0,
    egresos: 0,
    porcentaje: 0,
    utilidad: 0
  }

/*   @Input() set data(val: any) {
    this.baseGravable = val;
    this.calcularSpeed()
    //this.obtenerDato();
  } */

  tipoPeriodo: boolean = false;

  response: DatosFiscales;
  urlConstancia: any;
  spinnerLoading: boolean = true;

  
  speedValue: any;
  selectedValue: string;
  
  fechaActual: any;

  sizeX: any
  sizeY: any
  size: any

  constructor(
    private dashboardService: DashboardService,
    private auth: AuthService,
    private espacioTrabajoService: EspacioTrabajoService
  ) { 
  }

  ngOnInit(): void {
    this.selectedValue =  'Enero a ' + String(this.fechaActual)
    this.obtenerDatosFiscales()

    this.calcularPantalla()
  }

  calcularPantalla(){
    let pantallaAncho = (window.innerWidth * .25)
    if(window.innerWidth > 450){
      this.sizeX = (pantallaAncho) - (pantallaAncho * .13 ) 
      this.sizeY = (pantallaAncho / 2) - (window.innerWidth > 1600 ? 5 : 0) + (window.innerWidth < 1300 ? 0 : + 3)
      this.size = this.sizeX - 16
      this.positionText = [
        (window.innerWidth / 40),
        (window.innerWidth / 9),
        (window.innerWidth / 6),
        (window.innerWidth / 9),
      ]
      this.ringWidth = (window.innerWidth / 36)
    }else{
      this.sizeX = 280
      this.sizeY = 159
      this.size = 278
      this.positionText = [30, 140, 220, 140]
      this.ringWidth = 30
    }
  }

  obtenerDatosFiscales(): void {
    this.dashboardService.obtenerDatosFiscales(this._consultaRequest).subscribe((resp) => {
      this.spinnerLoading = false;
      this.response = resp.datosFiscales;
    },(_error) => {
      console.log("::Entro al error Datos fiscales: ", _error);
    }
    );
  }

  obtenerRegimen(){
    let requestRegimen = {
      rfc: this._consultaRequest.rfc,
    }
    this.espacioTrabajoService.obtenerRegimenFiscal(requestRegimen)
    .subscribe((response) => {
      this.regimenFiscal =  response.lista
      this.obtenerSaludFiscal()
    },(_error) => {
      console.log("::Entro al error Datos fiscales: ", _error);
    });
  }

  obtenerSaludFiscal(){
    let _request
    if(this.tipoPeriodo){
      _request = {
        rfc: this._consultaRequest.rfc,
        regimen: this.regimenFiscal[0].idSat,
        mes: -1,
        anio: this._consultaRequest.anio,
      }
    }else{
      _request = {
        rfc: this._consultaRequest.rfc,
        regimen: this.regimenFiscal[0].idSat,
        mes: this._consultaRequest.mes,
        anio: this._consultaRequest.anio
      }
    }
    console.log('Request: ', _request)
    this.dashboardService.obtenerSaludFiscal(_request).subscribe(
      (response) => {
        console.log(response)
        this.baseGravable = response.baseGravable
        this.calcularSpeed()
      },(_error) => {
        console.log("Error: ", _error);
    });
  }

  calcularSpeed(){
    this.speedValue = this.baseGravable.porcentaje / 10
  }

  public get width() {
    return window.innerWidth;
  }
  
  verConstancia(){
    this.urlConstancia  = localStorage.Constancia;
    window.open(this.urlConstancia, "_blank");
    }
}
