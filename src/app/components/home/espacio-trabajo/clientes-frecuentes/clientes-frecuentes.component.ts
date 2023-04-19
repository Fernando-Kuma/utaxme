import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';

@Component({
  selector: 'app-clientes-frecuentes',
  templateUrl: './clientes-frecuentes.component.html',
  styleUrls: ['./clientes-frecuentes.component.css']
})
export class ClientesFrecuentesComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  back(){
    this.router.navigateByUrl(NAV.espacioTrabajo);
  }

}
