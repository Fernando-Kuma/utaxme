import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { Auth, User } from 'src/app/shared/model/auth-model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DashboardService } from 'src/app/shared/service/dashboard.service';


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

  _auth: any;
  _codigo: any;
  _user: any;
  _reintento: number = 1;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: AuthService,
    private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.authService.getIp();
    let first = localStorage.getItem('first');
    if(!first){
      localStorage.setItem('first','1');
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }else{
      localStorage.setItem('first','1');
    }
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(".+@.+\..+")]],
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
      this._user = new User();
      this._user.email = this.form.controls['email'].value;
      this._user.password = this.form.controls['password'].value;
      // this.spinner.show();
      this.authService.login(this._user).subscribe({
        next: (response) => {
          if(response != null ){
            this.authService.getIp()
            response.nombre = response.nombre.toLowerCase()
            response.apellidos = response.apellidos.toLowerCase()
            //response.email = this._user.email
            this.validarCliente(response)
          }else{
            this.selectMessageError("El usuario no se encuentra registrado en el sistema");
          }
        },
        error: (_) => {
          if(_.error.response === "No coinciden las credenciales"){
            this.selectMessageError(_.error.response);
          }else{
            console.log("Error: ", _)
          }
        }
      });
      
    } 
  }

  validarCliente(usuario: any){
    

    let request = {
      folio: usuario.folio
    }
    this.dashboardService.validarCliente(request).subscribe({
      next: (response) => {
        if(response != null ){
          usuario.cliente = response
          sessionStorage.setItem('admin-user', JSON.stringify(usuario));
          //sessionStorage.setItem('cliente', JSON.stringify(response));
          let email = {
            username: this._user.email
          }
          this.authService.payment(email).subscribe({
            next: (resp) => {
              console.log(resp)
            },
            error: (_) => {
                console.log("Error: ", _)
            }
          });
          this.router.navigateByUrl(NAV.dashboard);
          
        }
      },
      error: (_) => {
        console.log("Error: ", _)
      }
    });
  }

  enterContrato(){
    this.password.focus();
  }

  getError(value: string){
    if (this.form.get(value).errors?.required) {
      return 'Este campo es requerido';
    } else if (value == 'email') {
      return this.form.get('email').hasError('contrato')
      ? 'Las credenciales ingresadas no existen'
      : this.form.get('email').hasError('pattern')
      ? 'Correo electrónico inválido'
      : this.form.get('email').hasError('minlength')
      ? 'El contrato debe contener al menos 3 caracteres'
      : '';
    } else if (value == 'password') {
      return this.form.get('password').hasError('requirements')
      ? 'La contraseña debe contener al menos 8 caracteres, una mayúscula y un número'
      : this.form.get('password').hasError('minlength')
      ? 'La contraseña debe contener al menos 8 caracteres'
      : this.form.get('password').hasError('invalid')
      ? 'Credenciales inválidas'
      : '' ;
    }
  }

  changePassword() {
    /* localStorage.setItem('back-return', NAV.login); */
    this.router.navigateByUrl(NAV.recuperarContrasena); 
  }

  selectMessageError(message:string) {
    if(message === 'No coinciden las credenciales'){
      //Credenciales inválidas
      this.form.get('password')?.setErrors({ invalid: true });
      this.getError('password');
    }
    if(message === 'El usuario no se encuentra registrado en el sistema'){
      //Las credenciales ingresadas no existen
      this.form.get('email')?.setErrors({ contrato: true });
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
    let texto = event.target.value;
    this.form.get('email').setValue(texto.trim());
  }
}
