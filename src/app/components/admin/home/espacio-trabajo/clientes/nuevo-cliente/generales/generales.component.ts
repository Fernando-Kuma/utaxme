import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core/option';
import { MatSelect } from '@angular/material/select/select';
import { Cliente } from 'src/app/shared/model/cliente-model';
import { CatalogosService } from 'src/app/shared/service/catalogos.service';
import { NuevoClienteComponent } from '../nuevo-cliente.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {
  _tabs: number = -1;
  tipoPersona: number = 0;
  @Input() set tabs(val: number) {
    if(val >= 0){
      console.log("Cambiaste de TabGenerales:",val)
      this.validarGeneralesTab();
    }
  }

  _dataCliente:any;
  @Input() set dataCliente(val: any) {
      console.log("Data:",val)
      this._dataCliente = val;
      this.setearValoresCliente();
  }
  
  @ViewChild('selectDispositivo') selectDispositivo;
  @ViewChild('selectDispositivo') matRef: MatSelect;

  @Output()
  selectTab : EventEmitter<number> = new EventEmitter<number>();

  Options = [];

  selectable = true;
  removable = true;
  public formGenerales: FormGroup;
  body : any;
  constructor(private formBuilder: FormBuilder,
    private catalogoService: CatalogosService,
    public dialogRef: MatDialogRef<NuevoClienteComponent>) { 
  }

  ngOnInit(): void {
    this.crearForm();
  }

  crearForm(){
    this.formGenerales = this.formBuilder.group({
      rfc: ['', [Validators.required, Validators.pattern("^(([A-ZÑ&]{3})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" +
      "(([A-ZÑ&]{4})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" +
      "(([A-ZÑ&]{4})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" +
      "(([A-ZÑ&]{4})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$")]],
      dispositivos: [[], [Validators.required]],
      correo: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9._-]+\.[a-z]{2,4}$")]],
      celular: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
      observaciones: [''],
      contrasena: ['', [Validators.required,Validators.pattern("(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[`~!@#$%^&\\\\*\\\\(\\\\)\\\\-_=\\\\+\\\\{\\\\}\\\\[\\\\]|\\\\\\\\:;\\'<>,\\\\.?\\\\/]).{8,}")]],
      folio: ['', [Validators.required]],
    });
  }

  getErrorRequerido(campo){
    localStorage.setItem('generales','0');
    if (this.formGenerales.get(campo).errors?.required) {
      return 'Este campo es requerido';
    } else if(this.formGenerales.get(campo).errors?.pattern){
      if(campo == 'contrasena'){
        return 'El formato de '+campo+' no es valido debe contener (Mayusculas,Minusculas y Numeros)';
      }else{
        return 'El formato de '+campo+' no es valido';
      }
    }
  }

  get formulario() {
    return this.formGenerales.controls;
  }

  removeService(index: number, item: any){
    this.matRef.options.forEach((data: MatOption) => {      
      if(item === data.value){
        data.deselect();
      }
    });
  }

  validarGenerales(){
    let validacion = true;
    if(this.formGenerales.invalid){
      Object.keys(this.formGenerales.controls).forEach((field) => {
          const control = this.formGenerales.get(field);
          if (!control.valid) {
              control.markAsTouched({ onlySelf: true });
          }
      });
      validacion = false
    }

    if(validacion){
      console.log("Formulario lleno")
      localStorage.setItem('generales','1');
      this.guardarGenerales();
      this.cambiarTab();
    }else{
      console.log("Formulario no lleno")
      localStorage.setItem('generales','0');
    }
  }

  obtenerRegimen(){
    this.catalogoService.obtenerRegimenFiscales(this.tipoPersona)
      .subscribe((response) => {
        console.log("Regimens:",response);
        this.Options = response;
      },(_error) => {
        console.log("Error en obtener regimen: ", _error);
      });
  }

  cambiarTab(){
    this.selectTab.emit(1);
  }

  validarForm(){
    let validacion = true;
    if(this.formGenerales.invalid){
      Object.keys(this.formGenerales.controls).forEach((field) => {
          const control = this.formGenerales.get(field);
          if (!control.valid) {
              control.markAsTouched({ onlySelf: true });
          }
      });
      validacion = false
    }

    if(validacion){
      console.log("Formulario lleno")
      this.guardarGenerales();
      localStorage.setItem('generales','1');
    }else{
      console.log("Formulario no lleno")
      localStorage.setItem('generales','0');
    }
  }

  guardarGenerales(){
    let body = JSON.parse(localStorage.getItem('bodyCliente'));
    body.rfc = this.formGenerales.get('rfc').value;
    body.password = this.formGenerales.get('contrasena').value;
    body.folioUtaxme = this.formGenerales.get('folio').value;
    body.idRegimenFiscal = [];
    let regimens = this.formGenerales.get('dispositivos').value;
    regimens.forEach(element => {
      body.idRegimenFiscal.push(element.id);
    });
    body.email = this.formGenerales.get('correo').value;
    body.celular = this.formGenerales.get('celular').value;
    body.observaciones = this.formGenerales.get('observaciones').value;
    console.log("Body:",body);
    localStorage.setItem('bodyCliente', JSON.stringify(body));
  }

  public onlyNumbers(event) {
    let k;
    k = event.charCode;
    return (!(k > 31 && (k < 48 || k > 57)));
  }

  public keyShowAutocomplete(event: any) {
    if(event.target.value > 0 || event.target.value == ''){
    
    }else{
      if(Number(event.target.value) != 0){
        this.formGenerales.get('celular')?.setErrors({ incorrectText: true });
      }
    }
  }

  close(){
    this.dialogRef.close();
  }

  validarRFC(){
    let rfc = this.formGenerales.get('rfc').value;
    if(rfc.length == 12){
      this.tipoPersona = 2
    }else{
      this.tipoPersona = 1
    }
    console.log("tipoPersona;",this.tipoPersona);
    this.obtenerRegimen();
  }

  validarGeneralesTab(){
    let validacion = true;
    if(this.formGenerales.invalid){
      Object.keys(this.formGenerales.controls).forEach((field) => {
          const control = this.formGenerales.get(field);
          if (!control.valid) {
              control.markAsTouched({ onlySelf: true });
          }
      });
      validacion = false
    }

    if(validacion){
      console.log("Formulario lleno")
      localStorage.setItem('generales','1');
    }else{
      console.log("Formulario no lleno")
      localStorage.setItem('generales','0');
    }
  }

  public blockSpace(event) {
    let k;
    k = event.charCode;
    if (k == 32) return false;
  }

  paste(event){
    console.log(event.target.value);
    let texto = event.target.value;
    console.log(texto.trim());
    this.formGenerales.get('contrasena').setValue(texto.trim());
  }

  setearValoresCliente(){

    if(this._dataCliente){
      this.formGenerales.get('correo').setValue(this._dataCliente.correo);
      this.formGenerales.get('contrasena').setValue(this._dataCliente.password);
      this.formGenerales.get('folio').setValue(this._dataCliente.folio);
      this.formGenerales.get('correo').disable();
      this.formGenerales.get('contrasena').disable();
      this.formGenerales.get('folio').disable();
    }else{
      this.formGenerales.get('correo').enable();
      this.formGenerales.get('contrasena').enable();
      this.formGenerales.get('folio').enable();
    }


  }
}