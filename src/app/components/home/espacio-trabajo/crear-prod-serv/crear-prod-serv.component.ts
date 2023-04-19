import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';

@Component({
  selector: 'app-crear-prod-serv',
  templateUrl: './crear-prod-serv.component.html',
  styleUrls: ['./crear-prod-serv.component.css']
})
export class CrearProdServComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  back(){
    this.router.navigateByUrl(NAV.espacioTrabajo);
  }
}
