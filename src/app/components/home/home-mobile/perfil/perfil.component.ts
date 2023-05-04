import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  rfc: any;

  constructor(
    public router: Router,
    private auth: AuthService, 
  ) { }

  ngOnInit(): void {
    this.usuario = this.auth.usuario 
    if(this.usuario == null){
      this.auth.logout()
    }
  }

  regresar(){
    this.router.navigateByUrl(NAV.dashboard)
  }

}
