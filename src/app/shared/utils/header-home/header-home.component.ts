import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NAV } from '../../configuration/navegacion';
import { AuthService } from '../../service/auth.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent implements OnInit {

  @Input() color: string = '#122D4F';
  @Input() logo: string = 'image-toolbar';

  selected = new FormControl(1);

  user: any = {
    name: 'José Martínez',
    rol: 'act. empresarial' 
  }

  constructor(
    public router: Router, 
    private auth: AuthService,
    public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.user.name = this.auth.usuario.nombre + '' + this.auth.usuario.apellidos
    this.user.rol = 'Act. empresarial'
  }

  cambiarMenu(numeroMenu:number){
    this.matDialog.closeAll();
    switch (numeroMenu) {
      case 1:
          localStorage.setItem('menu', '1');
          this.router.navigateByUrl(NAV.dashboard);
        break;
      case 2:
          localStorage.setItem('menu', '2');
          this.router.navigateByUrl(NAV.espacioTrabajo);
        break;
      case 3:
          localStorage.setItem('menu', '3');
          this.router.navigateByUrl(NAV.saludFiscal);
        break;
      case 4:
          localStorage.setItem('menu', '4');
          this.router.navigateByUrl(NAV.perfil);
        break;
      default:
        break;
    }
  }

  salir(){
    this.auth.logout()
  }

  abrirModuloAyuda(){
    //this.router.navigateByUrl(NAV.login);
  }

  selectTab(index: number){
    this.selected.setValue(index);
  }

  openMenu(){
    this.selected.reset();
  }

  public get width() {
    return window.innerWidth;
  }

}
