import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class ConfiguracionAvanzadaService {
  private dialogConfig = new MatDialogConfig();

  detalle(): MatDialogConfig {
        this.dialogConfig.restoreFocus = false;
        this.dialogConfig.autoFocus = false;
        this.dialogConfig.data = {
            title: "Hola",
        }
        return this.dialogConfig;
    }
}
