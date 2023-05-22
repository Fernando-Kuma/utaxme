import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { AlertService } from 'src/app/shared/utils/alertas';
import { ServiceErrorDialogComponent } from 'src/app/shared/utils/service-error-dialog/service-error-dialog.component';
import { NuevoClienteComponent } from '../espacio-trabajo/clientes/nuevo-cliente/nuevo-cliente.component';

@Component({
  selector: 'app-accesos-directos',
  templateUrl: './accesos-directos.component.html',
  styleUrls: ['./accesos-directos.component.css']
})
export class AccesosDirectosComponent implements OnInit {

  @ViewChild('accesosModal') accesosModal : any;
  usuario: Usuario;
  nombreCliente: string;

  listaAccesos = [
    {
        "idCatAccesoDirecto": 1,
        "descripcion": "Añadir nuevo cliente",
        "predeterminado": 0,
        "path": "4",
        "activoInactivo": "A",
        "icono": null,
        "tipoAcceso": "administrador"
    },
    {
        "idCatAccesoDirecto": 2,
        "descripcion": "Ver paquetes",
        "predeterminado": 0,
        "path": "5",
        "activoInactivo": "A",
        "icono": null,
        "tipoAcceso": "administrador"
    },
    {
        "idCatAccesoDirecto": 3,
        "descripcion": "Añadir nuevo miembro",
        "predeterminado": 0,
        "path": "6",
        "activoInactivo": "A",
        "icono": null,
        "tipoAcceso": "administrador"
    }
  ]

  _reintento: number = 1;


  constructor(
    private dialog: MatDialog,
    private alertService: AlertService,
    private auth: AuthService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('back-return');
    this.usuario = this.auth.administrador 
    this.nombreCliente = this.usuario.nombre;
    if(this.usuario == null){
      this.auth.logout()
    }
  }



  public cerrarAccesosModal() {
    this.accesosModal.nativeElement.className = 'modal hide-modal';
  }

  public abrirAccesosModal() {
    this.accesosModal.nativeElement.className = 'modal show-modal';
  }

  public limpiarAccesos(){
    this.cerrarAccesosModal();
    //this.accesosUsuarioAux = [...this.accesosUsuario];
  }

  public actualizarAccesos(){
    console.log('actualizar')
    this.cerrarAccesosModal()
  }


  public modificaAcceso(acceso: any){
    console.log('modificar')
  }

  isAccesoActivo(descripcion: string){
    return false
    //return this.accesosUsuarioAux?.some(e => e.descripcion === descripcion);
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
