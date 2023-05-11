import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';

@Component({
  selector: 'app-full-size',
  templateUrl: './full-size.component.html',
  styleUrls: ['./full-size.component.css']
})
export class FullSizeComponent implements OnInit {

  tipoDashboard: any;
  tituloDashboard: string;
  textoDashboard: string;

  consultaRequest: any;

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.tipoDashboard = localStorage.getItem('dashboard');
    this.tituloDashboard = localStorage.getItem('titulo-dashboard');
    this.textoDashboard = localStorage.getItem('texto-dashboard');
    this.consultaRequest = JSON.parse(localStorage.getItem('consulta-dashboard'))
  }

  regresar(){
    localStorage.removeItem('dashboard')
    localStorage.removeItem('titulo-dashboard')
    localStorage.removeItem('texto-dashboard')
    this.router.navigateByUrl(NAV.dashboard);
  }

}
