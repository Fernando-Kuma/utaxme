import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuadrante-cumplimiento',
  templateUrl: './cuadrante-cumplimiento.component.html',
  styleUrls: ['./cuadrante-cumplimiento.component.css']
})
export class CuadranteCumplimientoComponent implements OnInit {

  datosFiscales:any = {
    tipoDec: 'Mensual',
    mes: 'Marzo',
    fechaA: 2023,
    estatus: 'Presentada',
    montoPagar: 648.00,
    recargosMultas: 0
  }

  constructor() { }

  ngOnInit(): void {
  }

}
