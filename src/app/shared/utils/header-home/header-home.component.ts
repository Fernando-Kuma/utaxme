import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NAV } from '../../configuration/navegacion';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit {

  @Input() color: string = '#122D4F';
  @Input() logo: string = 'image-toolbar';

  user: any = {
    name: 'José Martínez',
    rol: 'act. empresarial' 
  }

  constructor(public router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth
    this.user.name = this.auth.usuario.nombre + '' + this.auth.usuario.apellidos
    this.user.rol = 'Act. empresarial'
  }

  cambiarMenu(numeroMenu:number){
    switch (numeroMenu) {
      case 1:
          localStorage.setItem('menu', '1');
          this.router.navigateByUrl(NAV.dashboard);
        break;
      case 2:
          localStorage.setItem('menu', '2');
          this.router.navigateByUrl(NAV.proceso);
        break;
      default:
        break;
    }
  }

  salir(){
    this.auth.logout()
  }

  abrirModuloAyuda(){
    this.router.navigateByUrl(NAV.login);
  }

}
