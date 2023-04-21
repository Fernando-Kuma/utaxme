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
          subtitle: "<b>Teléfonos de contacto:</b>, <br>55-8952-2909 <br> 55-8952-2904 <br> 55-7575-9662<br> <b>Whatsapp<b/><br> 55 6884 5587<br> <b>Correo Electrónico</b><br> contacto@utaxme.com",
          cancelMessage: "Cancelar",
          confirmMessage: "Entendido",
          type: "success",
          showCancelMessage: false
      }
      return this.dialogConfig;
    } 
  
}
