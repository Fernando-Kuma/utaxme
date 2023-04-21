import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private dialogConfig = new MatDialogConfig();

    contacto(): MatDialogConfig {
      this.dialogConfig.restoreFocus = false;
      this.dialogConfig.autoFocus = false;
      this.dialogConfig.data = {
          title: "Contacto",
          subtitle: "<b>¡Recuerda!</b>, tu nueva contraseña te permitirá accesar cuando lo necesites.",
          cancelMessage: "Cancelar",
          confirmMessage: "Entendido",
          type: "success",
          showCancelMessage: false
      }
      return this.dialogConfig;
    } 

}
