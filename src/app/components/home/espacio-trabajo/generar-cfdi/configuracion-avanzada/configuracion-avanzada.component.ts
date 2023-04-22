import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-configuracion-avanzada',
  templateUrl: './configuracion-avanzada.component.html',
  styleUrls: ['./configuracion-avanzada.component.css']
})
export class ConfiguracionAvanzadaComponent{

  catalogoMoneda: any = [
    {
      clave: "MXN",
      descripcion: "MXN-Peso Mexicano",
    }
  ]
  catalogoDiasCredito: any = [
    {
      clave: "0",
      descripcion: "0",
    },
    {
      clave: "15",
      descripcion: "15",
    },
    {
      clave: "30",
      descripcion: "30",
    },
    {
      clave: "45",
      descripcion: "45",
    },
  ]

  catalogoMetodoPago: any;

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ConfiguracionAvanzadaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.crearForm();
    this.catalogoMetodoPago = this.data.metodoPago
  }

  crearForm(){
    this.form = this.formBuilder.group({      
      metodoPago: [''],
      moneda: [''],
      condicionesPago: [''],
      diasCredito: ['']
    });
  }

  changeDiasCredito() {
    var fechaCondiciones = new Date();
    let condiciones = "PAGO EN UNA SOLA EXHIBICIÓN"
    if (this.form.controls['diasCredito'].value  == "0") {
      condiciones = "PAGO EN UNA SOLA EXHIBICIÓN"
    } else if (this.form.controls['diasCredito'].value == "15") {
      fechaCondiciones.setDate(fechaCondiciones.getDate() + 15);
      condiciones = "Páguese a más tardar el " + this.formattedDate(fechaCondiciones) + " PAGO EN UNA SOLA EXHIBICIÓN.";
    } else if (this.form.controls['diasCredito'].value == "30") {
      fechaCondiciones.setDate(fechaCondiciones.getDate() + 30);
      condiciones = "Páguese a más tardar el " + this.formattedDate(fechaCondiciones) + " PAGO EN UNA SOLA EXHIBICIÓN.";
    } else if (this.form.controls['diasCredito'].value == "45") {
      fechaCondiciones.setDate(fechaCondiciones.getDate() + 45);
      condiciones = "Páguese a más tardar el " + this.formattedDate(fechaCondiciones) + " PAGO EN UNA SOLA EXHIBICIÓN.";
    }
    this.form.get('condicionesPago').setValue(condiciones);
  }

  formattedDate(d = new Date()) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return `${day}/${month}/${year}`;
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

}
