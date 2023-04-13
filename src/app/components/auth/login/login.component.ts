import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { Auth } from 'src/app/shared/model/auth-model';
import { LoginService } from 'src/app/shared/service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('password') password: MatInput;
  @ViewChild('email') email: MatInput;
  hide: boolean = true;
  title: string = 'BIENVENIDO';
  titleAlert: string = 'Este campo es requerido';
  form: FormGroup;
  post: any;
  imgLoad: boolean = false;
  _auth: any;
  _codigo: any;
  _user: any;
  _reintento: number = 1;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder, 
    private router: Router,
    private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.getIp();
    let first = localStorage.getItem('first');
    if(!first){
      localStorage.setItem('first','1');
      setTimeout(() => {
        window.location.reload();
      }, 750);
    }else{
      localStorage.setItem('first','1');
    }
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  checkPassword(control) {
    let enteredPassword = control.value;
    /* let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null; */
  }

  getErrorPassword() {
    return this.form.get('password').hasError('required')
      ? 'Este campo es requerido'
      : this.form.get('password').hasError('requirements')
      ? 'La contraseña debe contener al menos 8 caracteres, una mayúscula y un número'
      : '';
  }

  login(): void{
    if(this.form.invalid){
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        if (control.valid == false) {
            control.markAsTouched({ onlySelf: true });
        }
      });
    }
    if(this.form.valid){
      this._auth = new Auth();
      this._auth.email = this.form.controls['email'].value;
      this._auth.password = this.form.controls['password'].value;
      // this.spinner.show();
      this.continueLogin();
      
    } 
  }

  continueLogin() {
    /* this.adminService.login(this._auth).subscribe({
      next: ({httpStatus, message}) => {
        if (httpStatus === 200) {
          this.spinner.hide();
          if(this.adminService.getPerfi()?.descripcion == 'Ejecutivo' || this.adminService.getPerfi()?.descripcion == 'Operador'){
            localStorage.removeItem('dashboard')
            this.registrarBitacora();
            
          }
          else{
            this.selectMessageError('El usuario no se encuentra registrado en el sistema.');
          }
        } else {
          this.selectMessageError(message);
        }
      },
      error: (_) => {
        this.openDialog();
        this.spinner.hide();
      }
    }); */
    this.router.navigateByUrl(NAV.dashboard);
  }

  loadImage() {
    this.imgLoad = true;
  }

  enterContrato(){
    this.password.focus();
  }

  getError(value: string){
    if (this.form.get(value).errors?.required) {
      return 'Este campo es requerido';
    } else if (value == 'email') {
      return this.form.get('email').hasError('contrato')
      ? 'Este email no está asociado a una cuenta'
      : this.form.get('email').hasError('minlength')
      ? 'El contrato debe contener al menos 3 caracteres'
      : this.form.get('email').hasError('activo')
      ? 'Este email no está activo'
      : '';
    } else if (value == 'password') {
      return this.form.get('password').hasError('requirements')
      ? 'La contraseña debe contener al menos 8 caracteres, una mayúscula y un número'
      : this.form.get('password').hasError('invalid')
      ? 'La contraseña no coincide con el correo electrónico'
      : '' ;
    }
  }

  changePassword() {
    /* localStorage.setItem('back-return', NAV.login);
    this.router.navigateByUrl(NAV.registro); */
  }

  selectMessageError(message:string) {
    if(message.startsWith('La contrase')){
      this.form.get('password')?.setErrors({ invalid: true });
      this.getError('password');
    }
    if(message === 'El usuario no se encuentra registrado en el sistema.'){
      this.form.get('email')?.setErrors({ contrato: true });
      this.getError('email');
    }
    if(message === 'El usuario no se encuentra ACTIVO.'){
      this.form.get('email')?.setErrors({ activo: true });
      this.getError('email');
    }
  }

  openDialog(): void {
    /* const dialogRef = this.dialog.open(ServiceErrorDialogComponent, {
      width: '449px',
      height: '360px ',
      data:{numero: this._reintento, cerrarSesion: false},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((data) => {
      if(data > 0){
        this._reintento++;
        this.continueLogin();
      }
    }); */
  }

  public blockSpace(event) {
    let k;
    k = event.charCode;
    if (k == 32) return false;
  }

  paste(event){
    console.log(event.target.value);
    let texto = event.target.value;
    this.form.get('email').setValue(texto.trim());
  }
}
