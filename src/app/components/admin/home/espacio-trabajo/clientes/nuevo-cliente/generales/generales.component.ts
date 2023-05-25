import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core/option';
import { MatSelect } from '@angular/material/select/select';
import { Cliente } from 'src/app/shared/model/cliente-model';
import { CatalogosService } from 'src/app/shared/service/catalogos.service';

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {
  
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
    private catalogoService: CatalogosService) { 
  }

  ngOnInit(): void {
    this.crearForm();
    this.obtenerRegimen();
  }

  crearForm(){
    this.formGenerales = this.formBuilder.group({
      rfc: [null, [Validators.required]],
      dispositivos: [null, [Validators.required]],
      correo: [null, [Validators.required]],
      celular: [null, [Validators.required]],
      observaciones: [null],
    });
  }

  getErrorRequerido(){
    localStorage.setItem('generales','0');
    return 'Este campo es requerido';
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
    this.catalogoService.obtenerRegimenFiscales()
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
      localStorage.setItem('generales','1');
      this.guardarGenerales();
    }else{
      console.log("Formulario no lleno")
      localStorage.setItem('generales','0');
    }
  }

  guardarGenerales(){
    let body = JSON.parse(localStorage.getItem('bodyCliente'));
    body.rfc = this.formGenerales.get('rfc').value;
    body.idRegimenFiscal = this.formGenerales.get('dispositivos').value;
    body.email = this.formGenerales.get('correo').value;
    body.celular = this.formGenerales.get('celular').value;
    body.observaciones = this.formGenerales.get('observaciones').value;
    console.log("Body:",body);
    localStorage.setItem('bodyCliente', JSON.stringify(body));
  }
}
