import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfiguracionAvanzada } from 'src/app/shared/model/espacio-trabajo.model';

@Component({
  selector: 'app-configuracion-avanzada',
  templateUrl: './configuracion-avanzada.component.html',
  styleUrls: ['./configuracion-avanzada.component.css']
})
export class ConfiguracionAvanzadaComponent{

  formularioAvanzado: ConfiguracionAvanzada = new ConfiguracionAvanzada;

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
  catalogoPeriocidad: any;
  catalogoMeses: any;

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ConfiguracionAvanzadaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.catalogoMetodoPago = this.data.metodoPago
    this.catalogoMeses = this.data.meses
    this.catalogoPeriocidad = this.data.periodicidad
    this.crearForm();
    this.actualizarForm()
  }

  crearForm(){
    this.form = this.formBuilder.group({      
      metodoPago: [null, [Validators.required]],
      moneda: [null, [Validators.required]],
      condicionesPago: [null, [Validators.required]],
      diasCredito: [null, [Validators.required]],
      
      periodicidad: [null, [Validators.required]],
      meses: [null, [Validators.required]],
      anio: [null, [Validators.required]],
    });
  }

  changeDiasCredito() {
    let fechaCondiciones = new Date();
    let condiciones = ""
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

  actualizarForm(){
    this.form.get('metodoPago').setValue(this.data.dataFormulario.metodoPago);
    this.form.get('moneda').setValue(this.data.dataFormulario.moneda);
    this.form.get('condicionesPago').setValue(this.data.dataFormulario.condiciones);
    this.form.get('diasCredito').setValue(this.data.dataFormulario.diasCredito);

    if(this.data.dataFormulario.configuracionGeneral){
      const date = new Date();
      let _anioActual = date.getFullYear();
      let _mesActual = date.getMonth();
      this.form.get('periodicidad').setValue(this.data.dataFormulario.periodicidad);
      this.form.get('meses').setValue(this.catalogoMeses[_mesActual].clave);
      this.form.get('anio').setValue(_anioActual);
    }

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
    this.dialogRef.close(this.formularioAvanzado);
  }

  cancelarForm(){
    this.formularioAvanzado = this.data.dataFormulario
    this.closeDialog()
  }

  guardarForm(){
    this.formularioAvanzado.metodoPago = this.form.value.metodoPago;
    this.formularioAvanzado.moneda = this.form.value.moneda;
    this.formularioAvanzado.condiciones = this.form.value.condicionesPago;
    this.formularioAvanzado.diasCredito = this.form.value.diasCredito;
    if(this.data.dataFormulario.configuracionGeneral){
      this.formularioAvanzado.diasCredito = this.form.value.periodicidad;
      this.formularioAvanzado.diasCredito = this.form.value.meses;
      this.formularioAvanzado.diasCredito = this.form.value.anio;
    }

    this.closeDialog()
  }

  get formulario() {
    return this.form.controls;
  }


}
