import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { Admin } from 'src/app/shared/model/auth-model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DashboardService } from 'src/app/shared/service/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceErrorDialogComponent } from 'src/app/shared/utils/service-error-dialog/service-error-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponentAdmin implements OnInit {

  @ViewChild('password') password: MatInput;
  @ViewChild('email') email: MatInput;
  hide: boolean = true;
  title: string = 'BIENVENIDO';
  titleAlert: string = 'Este campo es requerido';
  form: FormGroup;

  _auth: any;
  _codigo: any;
  _admin: any;
  _reintento: number = 1;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService: AuthService,
    private dashboardService: DashboardService,
    public spinner: NgxSpinnerService
  ) { }

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
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login(): void{
    if(this.form.invalid){
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        if (!control.valid) {
            control.markAsTouched({ onlySelf: true });
        }
      });
    }
    if(this.form.valid){
      this._admin = new Admin();
      this._admin.username = this.form.controls['email'].value;
      this._admin.password = this.form.controls['password'].value;
      this.spinner.show();
      this.authService.loginAdmin(this._admin).subscribe({
        next: (response) => {
          this.spinner.hide();
          if(response.httpStatus == 200 ){
            if(response.data != null){
              this.authService.getIp()
              response.data.nombreCompleto = response.data.tbUsuario.nombreCompleto.toLowerCase()
              let datoCliente = response.data
              sessionStorage.setItem('root-user', JSON.stringify(datoCliente.tbUsuario));
              delete datoCliente.tbUsuario;
              sessionStorage.setItem('root-user-rfc', JSON.stringify(datoCliente));
              this.router.navigateByUrl(NAV.homeAdmin);
            }else{
              this.openDialog()
            }
          }else{
            this.selectMessageError(response.message);
          }
        },
        error: (_) => {
          this.spinner.hide();
            this.openDialog()
            console.log("Error: ", _)
        }
      });
      
    } 
  }


  enterContrato(){
    this.password.focus();
  }

  getError(value: string){
    if (this.form.get(value).errors?.required) {
      return 'Este campo es requerido';
    } else if (value == 'email') {
      return this.form.get('email').hasError('contrato')
      ? 'El usuario no se encuentra registrado.' //Las credenciales ingresadas no existen
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
      ? 'La contraseña no coincide.' //Credenciales inválidas
      : '' ;
    }
  }

  changePassword() {
    this.router.navigateByUrl(NAV.recuperarContrasena); 
  }

  selectMessageError(message:string) {
    console.log(message)
    if(message === 'La contraseña no coincide.'){
      //Credenciales inválidas
      this.form.get('password')?.setErrors({ invalid: true });
      this.getError('password');
    }
    if(message === 'El usuario no se encuentra registrado...'){
      //Las credenciales ingresadas no existen
      this.form.get('email')?.setErrors({ contrato: true });
      this.getError('email');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ServiceErrorDialogComponent, {
      width: '449px',
      height: '360px ',
      data:{numero: this._reintento, cerrarSesion: false, tipoError: "login"},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((data) => {
      if(data > 0){
        this._reintento++;
        this.login();
      }
    });
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

  regitro(){

  }

  help(){
    
  }


}
