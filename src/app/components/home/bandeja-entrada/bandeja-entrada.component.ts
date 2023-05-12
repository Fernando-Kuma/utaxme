import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { AuthService } from 'src/app/shared/service/auth.service';
import { NotificacionesService } from 'src/app/shared/service/notificaciones.service';

@Component({
  selector: 'app-bandeja-entrada',
  templateUrl: './bandeja-entrada.component.html',
  styleUrls: ['./bandeja-entrada.component.css']
}) 
export class BandejaEntradaComponent implements OnInit {

  tituloProceso: string = 'bandeja de entrada'

  selected = new FormControl(1);
  estatus : string = 'noleidas';
  
  public form: FormGroup;


  notificaciones : any[];
  notificacionesGuardado : any[];
  notificacionSeleccionado: any;
  idNotificacionSeleccionado: number = 0;

  mostrarData: boolean = true;

  constructor(public router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificacionesService,
    private auth: AuthService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({      
      busqueda: [null],
    });
    this.estatus = "leidas"
    this.tabChange(1)
  }

  regresar(){
    localStorage.removeItem('id-notificacion')
    if(this.width <= 450 && this.notificacionSeleccionado){
      this.notificacionSeleccionado = null
      this.fillnotifications()
    }else{
      this.router.navigateByUrl(NAV.dashboard)
    }
  }

  selectTab(index: number){
    this.selected.setValue(index);
  }

  tabChange(index: any){
    this.selectTab(index)
    this.form.reset();
    this.idNotificacionSeleccionado = 0
    this.notificacionSeleccionado = null
    if(index == 0){
      this.estatus ="noleidas"
      this.fillnotifications();
    }else{
      this.estatus ="leidas"
      this.fillnotifications();
    }
  }
  
  fillnotifications(){
    this.notificaciones = []
    this.notificationService.obtenerNotificacion(this.auth.usuario.cliente.rfc).subscribe({
      next: (result) => {
        if(result.notificaciones.length > 0){
          if(this.estatus === "leidas"){
            this.estatus = "leidas";
            this.notificaciones = result.notificaciones.filter(ele => ele.leida);
          }else{
            this.notificaciones = result.notificaciones.filter(ele => !ele.leida);
            this.estatus = "noleidas";
          }

          if(this.width <= 450){
            this.notificaciones = result.notificaciones
          }

          if(this.notificaciones.length > 0){
            this.mostrarData = false;
            console.log(localStorage.getItem('id-notificacion'))
            if(localStorage.getItem('id-notificacion')){
              let idNotificacion = Number(localStorage.getItem('id-notificacion'))
              this.selecionarNotificacion(this.notificaciones.find( ele => ele.idNotificacion ==  idNotificacion))
              localStorage.removeItem('id-notificacion')
            }

            this.notificacionesGuardado = this.notificaciones
          }else{
            this.mostrarData = true;
            
          }
        }else{
          this.mostrarData = true;
        }
            
      },
      error: () => {
        console.log('error')
        this.mostrarData = true;
      }
    });

  }

  selecionarNotificacion(notificacion: any){
    this.form.reset();
    this.actualizarNotificacion(notificacion)
    this.notificacionSeleccionado = notificacion
    this.idNotificacionSeleccionado = this.notificacionSeleccionado.idNotificacion
  }

  actualizarNotificacion(notificacion){
    let request = {
      idNotificacion : notificacion.idNotificacion,
      rfc: this.auth.usuario.cliente.rfc
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

  onKeyDownEvent(event: any){
    let filtro = event.target.value;
    if(this.notificacionesGuardado.length > 0){
      this.notificaciones = this.notificacionesGuardado.filter( item =>
        item?.titulo?.toLowerCase().includes(filtro.toLowerCase())
      );
    }
  }

  returnFilter(){
    this.form.reset();
    this.fillnotifications();
  }

  public get width() {
    return window.innerWidth;
  }


}
