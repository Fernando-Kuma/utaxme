import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';

@Component({
  selector: 'app-codigo-recuperacion',
  templateUrl: './codigo-recuperacion.component.html',
  styleUrls: ['./codigo-recuperacion.component.css']
})
export class CodigoRecuperacionComponent implements OnInit {

  imgLoad: boolean = false;
  email: string;
  timeOut: boolean = false;
  btnControl: boolean = true;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  loadImage() {
    this.imgLoad = true;
  }

  btnHandlerEnabled(active: boolean) {
    this.btnControl = active;
  }

  timeOutHandler(timeout: boolean){
    this.timeOut = timeout;
  }

  reenviarCodigo(){

  }

  validarCodigo(){
    this.router.navigateByUrl(NAV.nuevaContrasena); 
  }
}
