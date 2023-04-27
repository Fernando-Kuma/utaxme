import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { ConfirmarCancelarDialogComponent } from '../confirmar-cancelar-dialog/confirmar-cancelar-dialog.component';

@Component({
  selector: 'app-cancelar-dialog',
  templateUrl: './cancelar-dialog.component.html',
  styleUrls: ['./cancelar-dialog.component.css']
})
export class CancelarDialogComponent implements OnInit {

  nOrdenNuevoList: any = [
    {
      clave: "01",
      descripcion: "220911",
    },
    {
      clave: "25",
      descripcion: "221121",
    },
    {
      clave: "48",
      descripcion: "221005",
    },
    {
      clave: "10",
      descripcion: "230113",
    },
  ];

  catalogoMotivoCancelacion: any = [
    {
      clave: "01",
      descripcion: "Comprobante emitido con errores con relacion"
  },
  {
      clave: "02",
      descripcion: "Comprobante emitido con errores sin relacion"
  },
  {
      clave: "03",
      descripcion: "No se llevo a cabo la operacion"
  },
  {
      clave: "04",
      descripcion: "Operacion nominativa relacionada con una factura global"
  }
  ];

  disabled: boolean = true;
  public form: FormGroup;
  

  constructor(
    public dialogRef: MatDialogRef<CancelarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    /* this.actionDisabledOrden(); */
    this.crearForm();
    /* this.catalogoMotivoCancelacion = this.data.motivoCancelacion */
  }

 /*  actionDisabledOrden() {
    this.form.controls['nOrden'].disable();
    
  } */
  crearForm(){
    this.form = this.formBuilder.group({     
      nOrden: [{ value: '04665', disabled: this.disabled }], 
      motivoCancelacion: [null, []],
      nOrdenNuevo: [null, []],
    });
  }

  confirmarCancelacionDialog(){
    const dialogRef = this.dialog.open(
      ConfirmarCancelarDialogComponent, 
      this.dialogService.confirmarCancelarCfdi()
    );
    dialogRef.afterClosed().subscribe(
      data => {
        this.dialogRef.close(false);
      }
    );
  }


  closeDialog() {
    this.dialogRef.close(false);
  }

}
