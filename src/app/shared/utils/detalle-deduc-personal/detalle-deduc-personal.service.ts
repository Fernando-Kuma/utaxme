import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DetalleDeducPersonalService {

  private dialogConfig = new MatDialogConfig();

    detalleDeducPersonal(): MatDialogConfig {
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
  
}
