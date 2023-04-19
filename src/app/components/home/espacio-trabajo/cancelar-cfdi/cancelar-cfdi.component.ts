import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';

@Component({
  selector: 'app-cancelar-cfdi',
  templateUrl: './cancelar-cfdi.component.html',
  styleUrls: ['./cancelar-cfdi.component.css']
})
export class CancelarCfdiComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  back(){
    this.router.navigateByUrl(NAV.espacioTrabajo);
  }
}
