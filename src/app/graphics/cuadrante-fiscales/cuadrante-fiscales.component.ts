import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuadrante-fiscales',
  templateUrl: './cuadrante-fiscales.component.html',
  styleUrls: ['./cuadrante-fiscales.component.css']
})
export class CuadranteFiscalesComponent implements OnInit {


datosFiscales:any = {
    regimen: 'Actividades Empresariales con Ingresos a través de Plataformas Tecnológicas',
    razon: 'Alix Perez Perez',
    rfc: 'Alix Perez Perez',
    correo: 'alezrr@mailito.com',
    direccion: 'Constitución 401, San Pablo Chimalpa C.P. 09455, Cuajimalpa de Morelos, CDMX'
  }
  
  ingresos:any = {
    egresos: 1990,
    ingresos: 14697,
    data: [{
      egresos: 40,
      ingresos: 60,
    }]
  }


  speedValue: number = 6;

  constructor() { }

  ngOnInit(): void {
  }

}
