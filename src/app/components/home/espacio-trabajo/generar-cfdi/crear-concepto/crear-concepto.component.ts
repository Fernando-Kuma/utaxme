import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-crear-concepto',
  templateUrl: './crear-concepto.component.html',
  styleUrls: ['./crear-concepto.component.css']
})
export class CrearConceptoComponent {

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CrearConceptoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.crearForm();
  }

  crearForm(){
    this.form = this.formBuilder.group({      
      buscar: [''],
      nombreProducto: [''],
      clavaProducto: [''],
      unidad: [''],
      clavaUnidad: [''],
      valorUnitario: [''],
      descripcion: [''],
      impuestoT: [''],
      impuestoR: [''],
      impuestoL: [''],
      iva: [''],
      ieps: [''],
      isr: [''],
      iepsISR: [''],
      impuestoLocal: [''],
      tasaLocal: [''],
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

}
