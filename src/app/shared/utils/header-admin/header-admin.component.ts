import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { NAV } from '../../configuration/navegacion';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  @Input() color: string = '#122D4F';
  @Input() logo: string = 'image-toolbar';

  selected = new FormControl(1);

  user: any = {
    name: 'José Martínez',
    rol: 'act. empresarial' 
  }
  
  constructor(public router: Router, 
    private auth: AuthService,
    public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.user.name = this.auth.administrador.nombre
    this.user.rol = this.auth.administrador.rol
  }

  cambiarMenu(numeroMenu:number){
    this.matDialog.closeAll();
    switch (numeroMenu) {
      case 1:
          localStorage.setItem('menu', '1');
          this.router.navigateByUrl(NAV.homeAdmin);
        break;
      case 2:
          localStorage.setItem('menu', '2');
          this.router.navigateByUrl(NAV.espacioTrabajoAdmin);
        break;
      default:
        break;
    }
  }

  salir(){
    this.auth.logoutAdmin()
  }

  abrirModuloAyuda(){
    console.log('Modulo de ayuda')
  }

  selectTab(index: number){
    this.selected.setValue(index);
  }

  openMenu(){
    this.selected.reset();
  }

  notificaciones(){
    this.router.navigateByUrl(NAV.bandejaEntrada)
  }

}
