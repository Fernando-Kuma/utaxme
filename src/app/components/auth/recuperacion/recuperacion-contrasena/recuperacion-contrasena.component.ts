import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-recuperacion-contrasena',
  templateUrl: './recuperacion-contrasena.component.html',
  styleUrls: ['./recuperacion-contrasena.component.css']
})
export class RecuperacionContrasenaComponent implements OnInit {

  @ViewChild('email') email: MatInput;
  form: FormGroup;

  title: string = 'RECUPERA TU CONTRASEÑA';

  imgLoad: boolean = false;
  mensajeError: string;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: AuthService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
    email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9._-]+\.[a-z]{2,4}$")]],
    rfc: [null, [Validators.required, Validators.pattern("^(([A-ZÑ&]{4})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" +
    "(([A-ZÑ&]{4})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" +
    "(([A-ZÑ&]{4})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" +
    "(([A-ZÑ&]{4})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$")]]
    });
  }

  loadImage() {
    this.imgLoad = true;
  }

  /* send(){
    
    this.router.navigateByUrl(NAV.codigoRecuperacion); 
  } */

  cancel() {
      this.router.navigateByUrl(NAV.login); 
  }


  getError(value: string){
    if(value == 'email'){
      if (this.form.get(value).errors?.required) {
        return 'Este campo es requerido';
      } else if(this.form.get(value).errors?.pattern){
        return 'El formato del correo no es valido';
      } else{
        return this.mensajeError;
      }
    }else{
      if (this.form.get(value).errors?.required) {
        return 'Este campo es requerido';
      } else if(this.form.get(value).errors?.pattern){
        return 'El formato del rfc no es valido';
      } else{
        return this.mensajeError;
      } 
    }
  }

  send() {
    if(this.form.invalid){
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        if (!control.valid) {
            control.markAsTouched({ onlySelf: true });
        }
      });
    }
    if(this.form.valid){
      const email = this.form.value.email;
      const rfc = this.form.value.rfc;
      sessionStorage.setItem('email',email);
      sessionStorage.setItem('rfc',rfc);

      this.spinner.show();
      this.authService.enviarCodigoPass(email,rfc).subscribe({
        next: (response) => {
          this.spinner.hide();
          if (response.codigo === "200") {
            localStorage.setItem('new-password-email', email);
            localStorage.setItem('new-password-rfc', rfc);
            this.router.navigateByUrl(NAV.codigoRecuperacion);
          }else{
            this.mensajeError = response.mensaje;
            if(response.mensaje === "No existe usuario con ese RFC"){
              this.form.get('rfc')?.setErrors({ activo: true });
              this.getError('rfc')
            }else{
              this.form.get('email')?.setErrors({ activo: true });
              this.getError('email')
            }
          }
        },
        error: (_) => {
          this.spinner.hide();
          console.log("No se pudo enviar el codigo")
        }
      });
    } 
  }

  /* getError(value: string){
    if (value == 'email') {
      return this.form.get(value).errors?.required
      ? 'Este campo es requerido'
      : this.form.get(value).hasError('incorrect')
      ? this.mensajeError
      : ''
    } else if (value == 'rfc') {
      return this.form.get(value).errors?.required
      ? 'Este campo es requerido'
      : this.form.get(value).hasError('incorrect')
      ? this.mensajeError
      : ''
    }
  } */

}
