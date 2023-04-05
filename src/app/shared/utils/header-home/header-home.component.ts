import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NAV } from '../../configuration/navegacion';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit {

  @Input() color: string = '#122D4F';
  @Input() logo: string = 'image-toolbar';

  constructor(public router: Router) { }

  ngOnInit(): void {
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
    localStorage.clear();
    this.router.navigateByUrl(NAV.login);
  }

  abrirModuloAyuda(){
    this.router.navigateByUrl(NAV.login);
  }

}
