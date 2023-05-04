import { formatDate } from '@angular/common';
import { Component, OnInit, Input, EventEmitter, Output, } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  public deleteNotification(index: number, event: any,item:any): void {
    event.stopPropagation()
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

  public goToInbox(idNotificacion?: number){
    localStorage.setItem('menu', '3');
    localStorage.setItem('id-notificacion',String(idNotificacion));
    this.close.emit(true);

    this.router.navigateByUrl(NAV.activation);
    if(localStorage.getItem('navigation') == 'inbox'){
      window.location.reload();
    }
  }

   fillnotifications(){
    let dateNotification: any;
    let diff: any;
    let diferenciaDias
    let tituloDia = 'HOY'
    this.sinResultados = false;
    this.notifications = [];
    this.notificationService.obtenerNotificacion(this.auth.usuario.cliente.rfc).subscribe({
      next: (result) => {
        if(result.notificaciones.length > 0){
          if(this.leidas){
            this.estatus = "leidas";
            this.notifications = result.notificaciones.filter(ele => ele.leida = true);
          }else{
            this.notifications = result.notificaciones.filter(ele => ele.leida = false);
            this.estatus = "noleidas";
          }

          if(this.notifications.length > 0){
            this.sinResultados = false;
          }else{
            this.sinResultados = true;
          }

          console.log(this.notifications)
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
            
      },
      error: () => {
        console.log('error')
        this.sinResultados = true;
      }
    });
  }


}

