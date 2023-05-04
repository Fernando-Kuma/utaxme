import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { AuthService } from 'src/app/shared/service/auth.service';
import { PincodeComponent } from 'src/app/shared/utils/pincode';

@Component({
  selector: 'app-codigo-recuperacion',
  templateUrl: './codigo-recuperacion.component.html',
  styleUrls: ['./codigo-recuperacion.component.css']
})
export class CodigoRecuperacionComponent implements OnInit {

  @ViewChild('pincode') pincode: PincodeComponent;
  imgLoad: boolean = false;
  email: string;
  rfc:string;
  timeOut: boolean = false;
  btnControl: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('new-password-email');
    this.rfc = localStorage.getItem('new-password-rfc');
  }

  loadImage() {
    this.imgLoad = true;
  }

  btnHandlerEnabled(active: boolean) {
    this.btnControl = active;
  }

  timeOutHandler(timeout: boolean){
    this.timeOut = timeout;
  }

  reenviarCodigo(){
    const email = this.email;
    const rfc = this.rfc;
    this.authService.enviarCodigoPass(email,rfc).subscribe({
      next: (response) => {
        if (response.codigo === "200") {
          this.reiniciarComponente();
        } else {
          this.pincode.setErrorMessage(response.mensaje);
          this.pincode.confirmCodeForm.get('digits')?.setErrors({ invalid: true });
        }
      },
      error: (_) => {
      }
    });
  }

  validarCodigo() {
    this.authService.validarCodigoPass(this.email,this.rfc,this.pincode.confirmCode()).subscribe({
      next: (response) => {
        if (response.codigo === "200") {
          this.router.navigateByUrl(NAV.nuevaContrasena);
        } else {
          this.pincode.setErrorMessage(response.mensaje);
          this.pincode.confirmCodeForm.get('digits')?.setErrors({ invalid: true });
        }
      },
      error: (_) => {
        console.log("No se pudo validar el codigo")
      }
    });
  }

  reiniciarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl(NAV.codigoRecuperacion);
  }
}
