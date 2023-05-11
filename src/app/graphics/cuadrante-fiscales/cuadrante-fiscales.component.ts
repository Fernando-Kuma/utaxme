import { Component, OnInit, Input } from '@angular/core';
import { DatosFiscales } from 'src/app/shared/model/dashboard.mode';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DashboardService } from 'src/app/shared/service/dashboard.service';

@Component({
  selector: 'app-cuadrante-fiscales',
  templateUrl: './cuadrante-fiscales.component.html',
  styleUrls: ['./cuadrante-fiscales.component.css']
})
export class CuadranteFiscalesComponent implements OnInit {

  _consultaRequest: any;
  @Input() set consultaRequest(val: any) {
    this._consultaRequest = val;
    this.obtenerSaludFiscal()
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

  tipoPeriodo: boolean = true;

  response: DatosFiscales;
  urlConstancia: any;
  spinnerLoading: boolean = true;


  speedValue: any;

  constructor(
    private dashboardService: DashboardService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.obtenerDatosFiscales()
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

  obtenerIngresosEngresos(): void {
    this.dashboardService.obtenerIngresosGastos(this._consultaRequest).subscribe(
      (response) => {
        this.spinnerLoading = false;
        this.baseGravable.egresos = 0
        this.baseGravable.ingresos = 0
        if(response.listaReporteIngresosEgresosBean.find((element) => element.tipoComprobante === 'GASTOS')){
          this.baseGravable.egresos = response.listaReporteIngresosEgresosBean.find((element) => element.tipoComprobante === 'GASTOS').total
        }
        if(response.listaReporteIngresosEgresosBean.find((element) => element.tipoComprobante === 'INGRESOS')){
          this.baseGravable.ingresos = response.listaReporteIngresosEgresosBean.find((element) => element.tipoComprobante === 'INGRESOS').total
        }

        this.calcularSpeed()
      },(_error) => {
        console.log("Error: ", _error);
    });
      
  }

  obtenerSaludFiscal(){
    this.dashboardService.obtenerSaludFiscal(this._consultaRequest).subscribe(
      (response) => {
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
