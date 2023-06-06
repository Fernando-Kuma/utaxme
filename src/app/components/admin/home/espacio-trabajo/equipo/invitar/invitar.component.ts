import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { ConfirmDialogComponent } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-invitar',
  templateUrl: './invitar.component.html',
  styleUrls: ['./invitar.component.css']
})
export class InvitarComponent implements OnInit {

  nombreRol: string;
  mensajeAlerta: string;
  pageTitle:string = 'INVITAR UNA PERSONA';
  public cuadrantes: string = '';
  
  public form: FormGroup;
  public pendiente: boolean;
  public usuario: any;
  public perfiles: any[];
  public perfilRol: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private dialogService: ConfirmDialogService) { }
  
  ngOnInit(): void {
    this.servicioPerfiles();
    this.createFormCreate();
    if(localStorage.getItem('equipoId')){
      this.pageTitle = 'DETALLE DE EQUIPO';
      this.usuario = ['prueba']
    }

  }

  createFormCreate() {
    this.form = this.formBuilder.group({      
      correo: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9._-]+\.[a-z]{2,4}$")]]      
    });
  }

  regresar(){
    this.router.navigateByUrl(NAV.homeAdmin + '/' + NAV.espacioTrabajo);
  }

  servicioPerfiles(){
    this.perfiles = [];
    this.perfilRol = []
  }


  enviarInvitacion() {
    if(this.form.get('correo').invalid){
      return;
    }
    const body = {
      email:this.form.get('correo').value,
      tbCatPerfil:{
        idCatPerfil: this.perfilRol.idCatPerfil
      },
    };
    
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent, 
      this.dialogService.altaMiembro()
    );
    dialogRef.afterClosed().subscribe(
      _data => {
        this.router.navigateByUrl(NAV.homeAdmin + "/" + NAV.espacioTrabajo+")");
      }
    );

  }

  edit(){
    this.usuario.tbCatPerfil.idCatPerfil = this.perfilRol.idCatPerfil;

    localStorage.removeItem('equipoId');
    this.router.navigateByUrl(NAV.homeAdmin + "/" + NAV.espacioTrabajo+")");
  }

  delete(){
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent, 
      this.dialogService.eliminarMiembro()
    );
    dialogRef.afterClosed().subscribe(
      _data => {
        if(_data == true){
          this.router.navigateByUrl(NAV.homeAdmin + "/" + NAV.espacioTrabajo+")");
        }
      }
    );
  }


  seleccionaCuadrante(perfil: any){
    this.perfilRol = perfil;
  }

  reenviarInvitacion(){
    setTimeout(() => {
      this.regresar();
    }, 3000);
  }

  getError(){
    return this.form.get('correo').errors?.required
      ? 'Este campo es requerido'
      : this.form.get('correo').hasError('incorrect')
      ? 'Este email ya cuenta con una invitación y se encuentra en estatus pendiente'
      : this.form.get('correo').hasError('incorrectActive')
      ? 'Este email ya cuenta con una invitación y se encuentra activo'
      : this.form.get('correo').hasError('inactivo')
      ? 'Este email se encuentra inactivo'
      : this.form.get('correo').hasError('email')
      ? 'Correo electrónico inválido'
      : this.form.get('correo').hasError('minlength')
      ? 'El contrato debe contener al menos 3 caracteres'
      : this.form.get('correo').errors?.pattern
      ? 'Correo electrónico inválido caracteres'
      : ''
  }
  
  get formulario() {
    return this.form.controls;
  }

  public blockSpace(event) {
    let k;
    k = event.charCode;
    if (k == 32) return false;
  }

}
