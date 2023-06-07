import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }


  administracionClientes(){
    this.router.navigateByUrl(NAV.homeAdmin +'/clientes');
  }

  declaracionesPendientes(){
    console.log('')
  }

  cumplimientoFiscal(){
    this.router.navigateByUrl(NAV.homeAdmin +'/cumplimiento-fiscal');
  }

  administracionPagos(){
    this.router.navigateByUrl(NAV.homeAdmin +'/admnistracion-pagos');
    console.log('')
  }

}
