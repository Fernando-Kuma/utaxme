import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';

@Component({
  selector: 'app-espacio-trabajo',
  templateUrl: './espacio-trabajo.component.html',
  styleUrls: ['./espacio-trabajo.component.css']
})
export class EspacioTrabajoComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  nuevaFactura(){
    this.router.navigateByUrl(NAV.generarCfdi);
  }

  cancelarFactura(){
    this.router.navigateByUrl(NAV.cancelarCfdi);
  }

  crearProdServ(){
    this.router.navigateByUrl(NAV.crearProdServ);
  }

  clientesFrecuentes(){
    this.router.navigateByUrl(NAV.clientesFrecuentes);
  }

  regresar(){
    this.router.navigateByUrl(NAV.perfil)
  }

}
