import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DetalleDeducPersonalService {

  private dialogConfig = new MatDialogConfig();

    detalleDeducPersonal(item): MatDialogConfig {
      this.dialogConfig.restoreFocus = false;
      this.dialogConfig.autoFocus = false;
      this.dialogConfig.data = {
          showCancelMessage: false,
          item: item,
      }
      return this.dialogConfig;
    } 
  
}
