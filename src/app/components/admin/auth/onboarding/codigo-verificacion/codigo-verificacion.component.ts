import { Component, Input, OnInit, Output, ViewChild,  EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { ConfirmDialogComponent } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.service';
import { PincodeComponent } from 'src/app/shared/utils/pincode';
import { ServiceErrorDialogComponent } from 'src/app/shared/utils/service-error-dialog/service-error-dialog.component';

@Component({
  selector: 'app-codigo-verificacion',
  templateUrl: './codigo-verificacion.component.html',
  styleUrls: ['./codigo-verificacion.component.css']
})

export class CodigoVerificacionComponent implements OnInit {

  @ViewChild('pincode') pincode: PincodeComponent;
  @Input() user: any;
  @Input() radioUsername: string = 'Usuario';
  @Input() emailPartial: string = 'c*****a@g*****.com';

  imgLoad: boolean = false;
  _codigo: any;
  email: string;

  @Output() notifyNextStep = new EventEmitter<number>();

  enabledPswCapture: boolean = false;
  btnControl: boolean = true;
  timeOut: boolean = false;

  constructor(private router: Router, 
    private dialog: MatDialog,
    public spinner: NgxSpinnerService,
    public dialogService: ConfirmDialogService) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('new-password-email');
  }

  sendValidationCode(): void {
    this.enabledPswCapture = true;  
  }

  btnHandlerEnabled(active: boolean) {
    this.btnControl = active;
  }

  timeOutHandler(timeout: boolean){
    this.timeOut = timeout;
  }

  validarCodigo() {
    const request = {
      email: this.email,
      codigo: this.pincode.confirmCode(),
      //idUsuario: this.user.idUsuarios
    };
    this.spinner.show();
    this.spinner.hide();
    const dialogRef = this.dialog.open(
        ConfirmDialogComponent, 
        this.dialogService.cuentaRegistrada()
      );
      dialogRef.afterClosed().subscribe(
        data => {
          this.router.navigateByUrl(NAV.loginAdmin);
        }
      );


  }

  reenviarCodigo(){
    this.spinner.show();
    const email = this.email;

    this.reiniciarComponente();
    this.spinner.hide();

    /* this.adminService.enviarCodigoPass(email).subscribe({
      next: ({httpStatus, message}) => {
        if (httpStatus === 200) {
          this.reiniciarComponente();
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.pincode.setErrorMessage(message);
          this.pincode.confirmCodeForm.get('digits')?.setErrors({ invalid: true });
        }
      },
      error: (_) => {
        this.openDialog(1);
        this.spinner.hide();
      }
    }); */
  }

  loadImage() {
    this.imgLoad = true;
  }

  openDialog(reintento:number): void {
    const dialogRef = this.dialog.open(ServiceErrorDialogComponent, {
      width: '449px',
      height: '360px ',
      data:{numero: reintento, cerrarSesion: false},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((_) => {
    });
  }

  reiniciarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl(NAV.verificacion+"/"+NAV.codigoValidacion);
  }


}