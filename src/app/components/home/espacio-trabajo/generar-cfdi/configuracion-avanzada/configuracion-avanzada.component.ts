import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-configuracion-avanzada',
  templateUrl: './configuracion-avanzada.component.html',
  styleUrls: ['./configuracion-avanzada.component.css']
})
export class ConfiguracionAvanzadaComponent{

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ConfiguracionAvanzadaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.crearForm();
  }

  crearForm(){
    this.form = this.formBuilder.group({      
      metodoPago: [''],
      moneda: [''],
      condicionesPago: [''],
      diasCredito: ['']
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

}
