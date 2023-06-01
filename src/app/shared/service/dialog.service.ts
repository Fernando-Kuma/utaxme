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
        metodoPago: data.catalogoMetodoPago,
        periodicidad: data.catalogoSatPeriodicidad,
        meses: data.catalogoSatMeses,
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

  crearConcetoAdmin(): MatDialogConfig {
    this.dialogConfig.restoreFocus = false;
    this.dialogConfig.autoFocus = false;
    this.dialogConfig.data = {
      concepto: '',
      metodo: 'crear',
      usuario: 'administrador'
    }
    return this.dialogConfig;
  }

  editarConceptoAdmin(item): MatDialogConfig {
    this.dialogConfig.restoreFocus = false;
    this.dialogConfig.autoFocus = false;
    this.dialogConfig.data = {
        concepto: item,
        metodo: 'editar',
        usuario: 'administrador'
    }
    return this.dialogConfig;
  }

  crearCliente(): MatDialogConfig {
    this.dialogConfig.restoreFocus = false;
    this.dialogConfig.autoFocus = false;
    this.dialogConfig.data = {
      cliente: '',
      metodo: 'crear',
    }
    return this.dialogConfig;
  }

  editarCliente(item): MatDialogConfig {
    this.dialogConfig.restoreFocus = false;
    this.dialogConfig.autoFocus = false;
    this.dialogConfig.data = {
        cliente: item,
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
  

  actualizarValor(titulo: any, valor: any): MatDialogConfig {
    this.dialogConfig.restoreFocus = false;
    this.dialogConfig.autoFocus = false;
    this.dialogConfig.data = {
        titulo: titulo,
        valor: valor,
    }
    return this.dialogConfig;
  }

  editarPagoCliente(idUsuario: any): MatDialogConfig {
    this.dialogConfig.restoreFocus = false;
    this.dialogConfig.autoFocus = false;
    this.dialogConfig.data = {
      idUsuario: idUsuario,
    }
    return this.dialogConfig;
  }
}
