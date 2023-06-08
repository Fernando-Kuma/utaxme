import { formatDate } from '@angular/common';
import { Component, OnInit, Input, EventEmitter, Output, } from '@angular/core';
import { Router } from '@angular/router';
import { NAV } from '../../configuration/navegacion';
import { ListaNotificaciones } from '../../model/notifications.model';
import { NotificacionesService } from '../../service/notificaciones.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  @Input() leidas: boolean;
  @Output() close = new EventEmitter<boolean>();
  
  notifications : any[] = [];
  estatus : string = 'noleidas';
  sinResultados: boolean = false;
  ordenNotificacion: ListaNotificaciones[] = [];

  fechaActual: any = new Date(formatDate(Date.now(), 'YYYY-MM-dd', 'en'))

  constructor(
    public router: Router, 
    private notificationService: NotificacionesService,
    private auth: AuthService
    ) {}

   async ngOnInit() {
    if(!this.leidas){
      this.estatus = "leidas";
      await this.fillnotifications();
    }else{
      this.estatus = "noleidas";
      await this.fillnotifications();
    }
  }

  public deleteNotification(event: any,item:any): void {
    event.stopPropagation()

    let request = {
      idNotificacion : item.idNotificacion,
    }
    this.notificationService.eliminarNotificacion(request).subscribe({
      next: (result) => {
        console.log('Notificacion actualizado')
        this.fillnotifications();
      },
      error: () => {
        console.log('error')
      }
    });
    /* this.notificationService.borrarNotificacion(this.idUsuario,item.idNotificacion).subscribe({
      next: (result) => {
        if(this.typeUser == 0){
          this.registrarBitacora(2, item.idNotificacion)
        }
        if(!this.leidas){
          this.notifications = [];
          this.estatus = "leidas";
          this.fillnotifications();
        }else{
          this.estatus = "noleidas";
          this.fillnotifications();
        }
      },
      error: () => {
        console.log('error')
      }
    }); */
  }

  public goToInbox(notificacion: any){
    this.actualizarNotificacion(notificacion)
    localStorage.setItem('menu', '5');
    localStorage.setItem('id-notificacion',String(notificacion.idNotificacion));
    if(this.auth.usuario != null){
      this.router.navigateByUrl(NAV.bandejaEntrada);
    }else{
      this.router.navigateByUrl(NAV.homeAdmin +'/'+ NAV.bandejaEntrada);
    }
    this.close.emit(true);

    if(this.router.url === '/bandeja-entrada'){
      window.location.reload();
    }
    if(this.router.url === '/home/bandeja-entrada'){
      window.location.reload();
    }
  }

  fillnotifications(){
    let rfc: string;
    if(this.auth.usuario != null){
      rfc = this.auth.usuario.cliente.rfc
    }else{
      rfc = this.auth.adminClave.rfc
    }
    this.sinResultados = false;
    this.notifications = [];
    this.notificationService.obtenerNotificacion(rfc).subscribe({
      next: (result) => {
        if(result.codigo == "200"){
          if(result.notificaciones.length > 0){
            this.notifications = result.notificaciones.filter(ele => ele.leida == !this.leidas);
            if(this.notifications.length > 0){
              this.sinResultados = false;
            }else{
              this.sinResultados = true;
            }
            /* result.data.forEach(element => {
              dateNotification = new Date(formatDate(new Date(element.fechaCreacion), 'YYYY-MM-dd', 'en'))
              diff = this.fechaActual - dateNotification;
              diferenciaDias = Math.floor(diff / (1000 * 60 * 60 * 24));
              let agregarTitulo = true
              let indexNotificacion = 0;
              this.ordenNotificacion.forEach((elem, index) => {
                if(elem.titulo == tituloDia){
                  agregarTitulo = false
                  indexNotificacion = index;
                }
              });
              if(diferenciaDias == 0){
                tituloDia = 'HOY'
              }else if(diferenciaDias == 1){
                tituloDia = 'AYER'
              }else{
                tituloDia = 'HACE MAS DE 3 DÍAS'   
              }
              if(agregarTitulo){
                this.ordenNotificacion.push({ titulo: tituloDia, listaNotificacion: [element]})
              }else{
                this.ordenNotificacion[indexNotificacion].listaNotificacion.push(element)
              }}); */
          }else{
            this.sinResultados = true;
          }
        }else{
          this.sinResultados = true;
        }
            
      },
      error: () => {
        console.log('error')
        this.sinResultados = true;
      }
    });
  }

  actualizarNotificacion(notificacion){
    let _rfc: string;
    if(this.auth.usuario != null){
      _rfc = this.auth.usuario.cliente.rfc
    }else{
      _rfc = this.auth.adminClave.rfc
    }
    let request = {
      idNotificacion : notificacion.idNotificacion,
      rfc: _rfc
    }
    this.notificationService.marcarLeidoNotificacion(request).subscribe({
      next: (result) => {
        console.log('Notificacion actualizado')
      },
      error: () => {
        console.log('error')
      }
    });
  }

}

