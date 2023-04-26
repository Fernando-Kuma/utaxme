import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  private dialogConfig = new MatDialogConfig();

  leavingBeforeSubmit(): MatDialogConfig {
    this.dialogConfig.restoreFocus = false;
    this.dialogConfig.autoFocus = false;
    this.dialogConfig.data = {
        title: "Contraseña actualizada",
        subtitle: "<b>¡Recuerda!</b>, tu nueva contraseña te permitirá accesar cuando lo necesites.",
        cancelMessage: "Cancelar",
        confirmMessage: "Entendido",
        type: "success",
        showCancelMessage: false
    }
    return this.dialogConfig;
    
  }
    generarCFDI(): MatDialogConfig {
      this.dialogConfig.restoreFocus = false;
      this.dialogConfig.autoFocus = false;
      this.dialogConfig.data = {
          title: "GENERAR CFDI",
          subtitle: "¿Está seguro que desea generar el CFDI?",
          cancelMessage: "Regresar",
          confirmMessage: "Aceptar",
          type: "warn",
          showCancelMessage: true
      }
      return this.dialogConfig;
    }

  constructor() { }
}
