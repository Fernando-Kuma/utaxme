import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core/option';
import { MatSelect } from '@angular/material/select/select';
import { CatalogosService } from 'src/app/shared/service/catalogos.service';

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {
  
  @ViewChild('selectDispositivo') selectDispositivo;
  @ViewChild('selectDispositivo') matRef: MatSelect;

  Options = [{
    nombre: "Switch dsjnhfkshfkjsdkfhdkj",
    icono: "image-dispositivo-servicio"
  },{
    nombre: "ONT",
    icono: "image-dispositivo-ont"
  },{
    nombre: "Radio Base",
    icono: "image-puntas-radio"
  },{
    nombre: "CPE",
    icono: "image-dispositivo-cpe"
  },{
    nombre: "Firewall",
    icono: "image-dispositivo-estatus"
  },{
    nombre: "Router",
    icono: "image-dispositivo-sitio"
  }];

  selectable = true;
  removable = true;
  public formGenerales: FormGroup;
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
      regimen: [null, [Validators.required]],
      dispositivos: [null, [Validators.required]],
      correo: [null, [Validators.required]],
      celular: [null, [Validators.required]],
      observaciones: [null],
    });
  }

  getErrorRequerido(){
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
    }else{
      console.log("Formulario no lleno")
    }
  }

  obtenerRegimen(){
    this.catalogoService.obtenerRegimenFiscales()
      .subscribe((response) => {
        console.log("Regimens:",response);
      },(_error) => {
        console.log("Error en obtener regimen: ", _error);
      });
  }
}
