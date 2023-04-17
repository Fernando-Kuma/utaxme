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
    this.obtenerIngresosEngresos();
  }

  response: DatosFiscales;
  
  baseGravable:any = {
    egresos: 0,
    ingresos: 0,
  }

  speedValue: any;

  constructor(
    private dashboardService: DashboardService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.calcularSpeed()
    this.obtenerDatosFiscales()
  }

  obtenerDatosFiscales(): void {
    this.dashboardService.obtenerDatosFiscales(this._consultaRequest).subscribe((resp) => {
      this.response = resp.datosFiscales;
      /* console.log('::RESP Datos Fiscales', this.response); */
    },(_error) => {
      console.log("::Entro al error Datos fiscales");
    }
    );
  }

  obtenerIngresosEngresos(): void {
    this.dashboardService.obtenerIngresosGastos(this._consultaRequest).subscribe(
      (response) => {
        console.log('Res gatos: ', response);
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

  calcularSpeed(){
    this.speedValue = 0 
    if(this.baseGravable.ingresos > this.baseGravable.egresos){
      console.log('true')
      this.speedValue = Number(((this.baseGravable.egresos / this.baseGravable.ingresos) * 10).toFixed(3))
    }
    console.log(Number(this.speedValue))
  }

  public get width() {
    return window.innerWidth;
  }
  
}