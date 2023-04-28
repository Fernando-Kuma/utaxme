import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialogConfig = new MatDialogConfig();

  configuracionAvanzada(data: any, form: any): MatDialogConfig {
    this.dialogConfig.restoreFocus = false;
    this.dialogConfig.autoFocus = false;
    this.dialogConfig.data = {
        metodoPago: data,
        dataFormulario: form,
    }
    return this.dialogConfig;
  }


  tablaConceptos(data: any): MatDialogConfig {
    this.dialogConfig.restoreFocus = false;
    this.dialogConfig.autoFocus = false;
    this.dialogConfig.data = {
        conceptos: data,
    }
    return this.dialogConfig;
  }

  crearConceto(): MatDialogConfig {
    this.dialogConfig.restoreFocus = false;
    this.dialogConfig.autoFocus = false;
    this.dialogConfig.data = {
      concepto: '',
      metodo: 'crear',
    }
    return this.dialogConfig;
  }

  editarConcepto(item): MatDialogConfig {
    this.dialogConfig.restoreFocus = false;
    this.dialogConfig.autoFocus = false;
    this.dialogConfig.data = {
        concepto: item,
        metodo: 'editar',
    }
    return this.dialogConfig;
  }

  detalle(): MatDialogConfig {
        this.dialogConfig.restoreFocus = false;
        this.dialogConfig.autoFocus = false;
        this.dialogConfig.data = {
            title: "Hola",
        }
        return this.dialogConfig;
    }

    confirmarCancelarCfdi(item, motivo): MatDialogConfig {
      this.dialogConfig.restoreFocus = false;
      this.dialogConfig.autoFocus = false;
      this.dialogConfig.data = {
        cfdi: item,
        motivo: motivo,
        metodo: 'confirmar',
      }
      return this.dialogConfig;
    }

    cancelarCfdi(item:any): MatDialogConfig {
      this.dialogConfig.restoreFocus = false;
      this.dialogConfig.autoFocus = false;
      this.dialogConfig.data = {
        cfdi: item,
        /* motivoCancelacion: data, */
      }
      return this.dialogConfig;
    }
}
