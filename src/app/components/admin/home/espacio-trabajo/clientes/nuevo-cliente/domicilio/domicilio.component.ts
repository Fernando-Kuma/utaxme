import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.component.html',
  styleUrls: ['./domicilio.component.css']
})
export class DomicilioComponent implements OnInit {

  public formDomicilio: FormGroup;
  constructor(private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    this.crearForm();
  }

  crearForm(){
    this.formDomicilio = this.formBuilder.group({
      domicilio: [null, [Validators.required]],
      colonia: [null, [Validators.required]],
      numeroext: [null, [Validators.required]],
      cp: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      ciudad: [null, [Validators.required]],
      numeroint: [null],
    });
  }

  getErrorRequerido(){
    return 'Este campo es requerido';
  }

  get formulario() {
    return this.formDomicilio.controls;
  }

  validarGenerales(){
    let validacion = true;

    if(this.formDomicilio.invalid){
      Object.keys(this.formDomicilio.controls).forEach((field) => {
          const control = this.formDomicilio.get(field);
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

}
