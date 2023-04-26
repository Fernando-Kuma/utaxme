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


alertCancelarCfdi(item): MatDialogConfig {
  this.dialogConfig.restoreFocus = false;
  this.dialogConfig.autoFocus = false;
  this.dialogConfig.data = {
      title: "¿Seguro que quieres continuar?",
      subtitle: "Estás apunto de generar cancelar una factura, recuerda que no podrás hacer modificaciones más adelante.",
      cancelMessage: "No, volver",
      confirmMessage: "Sí, cancelar factura",
      type: "warn",
      concepto: item,
      showCancelMessage: true
  }
  return this.dialogConfig;
}

successCancelarCfdi(): MatDialogConfig {
  this.dialogConfig.restoreFocus = false;
  this.dialogConfig.autoFocus = false;
  this.dialogConfig.data = {
      title: "¡Cancelación de factura exitosa!",
      subtitle: "<br>¡Recuerda!</br>, las cancelaciones de facturas impactan directamente a tu situación fiscal",
      cancelMessage: "No, volver",
      confirmMessage: "Sí, cancelar factura",
      type: "success",
      showCancelMessage: false
  }
  return this.dialogConfig;
}


  constructor() { }
}
