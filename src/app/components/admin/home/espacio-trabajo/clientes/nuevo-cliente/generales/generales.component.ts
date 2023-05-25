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
      rfc: [null, [Validators.required, Validators.pattern("^(([A-ZÑ&]{4})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" +
      "(([A-ZÑ&]{4})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" +
      "(([A-ZÑ&]{4})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" +
      "(([A-ZÑ&]{4})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$")]],
      dispositivos: [null, [Validators.required]],
      correo: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9._-]+\.[a-z]{2,4}$")]],
      celular: [null, [Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
      observaciones: [null],
    });
  }

  getErrorRequerido(campo){
    localStorage.setItem('generales','0');
    if (this.formGenerales.get(campo).errors?.required) {
      return 'Este campo es requerido';
    } else if(this.formGenerales.get(campo).errors?.pattern){
      return 'El formato de '+campo+' no es valido';
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
}
