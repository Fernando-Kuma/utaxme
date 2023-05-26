import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { AlertService } from 'src/app/shared/utils/alertas';
import { ServiceErrorDialogComponent } from 'src/app/shared/utils/service-error-dialog/service-error-dialog.component';
import { NuevoClienteComponent } from '../espacio-trabajo/clientes/nuevo-cliente/nuevo-cliente.component';
import { AccesosDirectosService } from 'src/app/shared/service/accesos-directos.service';
import { AccesoDirecto } from 'src/app/shared/model/accesos.model';

@Component({
  selector: 'app-accesos-directos',
  templateUrl: './accesos-directos.component.html',
  styleUrls: ['./accesos-directos.component.css']
})
export class AccesosDirectosComponent implements OnInit {

  @ViewChild('accesosModal') accesosModal : any;
  
  
  usuario: any;
  nombreCliente: string;
  
  listaAccesosUsuario: any;
  listaAccesos: any = []
  accesosUsuarioAux: any[] = [];

  _reintento: number = 1;


  constructor(
    private dialog: MatDialog,
    private alertService: AlertService,
    private auth: AuthService, 
    private accesosDirectosService: AccesosDirectosService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('back-return');
    this.usuario = this.auth.administrador 
    this.nombreCliente = this.usuario.nombreCompleto;
    if(this.usuario == null){
      this.auth.logout()
    }
    this.obtenerCatalogoAccesos()
  }



  obtenerCatalogoAccesos(){
    this.accesosDirectosService.obtenerAccesos().subscribe((response) => {
      console.log(response)
      if(response != null){
        this.listaAccesos = response
      }
      this.obtenerAccesosUsuario()
    },(_error) => {
      console.log("Error en obtener los catalogos: ", _error);
    });
  }

  obtenerAccesosUsuario(){
    this.listaAccesosUsuario = []
    let _idUsuario = this.auth.administrador.idUsuario
    this.accesosDirectosService.obtenerAccesosUsuario(_idUsuario).subscribe((response) => {
      console.log(response)
      if(response != null){
        response.forEach(element => {
          this.listaAccesosUsuario.push(element.accesoDirecto)
        });
      }
      this.accesosUsuarioAux = [...this.listaAccesosUsuario];
      console.log(this.accesosUsuarioAux)
    },(_error) => {
      console.log("Error en obtener los accesos del usuario: ", _error);
    });
  }

  actualizarAccesos(){
    let _request = this.generateJSON()    
    this.accesosDirectosService.modifcarAccesos(_request).subscribe((response) => {
      console.log(response)
      this.obtenerAccesosUsuario()
      this.cerrarAccesosModal()
    },(_error) => {
      console.log("Error al modificar los accesos: ", _error);
    });
  }


  public cerrarAccesosModal() {
    this.accesosModal.nativeElement.className = 'modal hide-modal';
  }

  public abrirAccesosModal() {
    this.accesosModal.nativeElement.className = 'modal show-modal';
  }

  public limpiarAccesos(){
    this.cerrarAccesosModal();
    this.accesosUsuarioAux = [...this.listaAccesosUsuario];
  }

  public modificaAcceso(acceso: any){
    console.log('acceso: ', acceso)
    const i = this.accesosUsuarioAux.findIndex(e => e.descripcion === acceso.descripcion);
    if (i > -1) {
      this.accesosUsuarioAux.splice(i, 1);
    } else {
      this.accesosUsuarioAux.push(acceso);
    }
    console.log(this.accesosUsuarioAux)
  }

  isAccesoActivo(descripcion: string){
    return this.accesosUsuarioAux?.some(e => e.descripcion === descripcion);
  }

  generateJSON() {
    let _accesosDirectos:any = [];
    this.accesosUsuarioAux.forEach((accesoUsuario,i) => {
        _accesosDirectos.push({
          paraUsuario: {
            idUsuario: this.auth.administrador.idUsuario
          },
          orden: 0,
          accesoDirecto: accesoUsuario
        });
    });
    return _accesosDirectos;
  }

  goToAccesoDirecto(ruta: string){
    localStorage.setItem('back-return', 'home');
    this.router.navigateByUrl(ruta);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ServiceErrorDialogComponent, {
      width: '449px',
      height: '360px ',
      data:{numero: this._reintento},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((_) => {
      this.limpiarAccesos();
      this._reintento++;
    });
  }

}
