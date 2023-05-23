import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.css']
})
export class MembresiaComponent implements OnInit {

  Paquetes = [{
    nombre: "Paquete Avanzado",
    id: 1
  },{
    nombre: "Paquete Medio",
    id: 2
  },{
    nombre: "Paquete Basico",
    id: 3
  }];

  public formMembresia: FormGroup;
  constructor(private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    this.crearForm();
  }

  crearForm(){
    this.formMembresia = this.formBuilder.group({
      paquete: [null, [Validators.required]],
      dia: [null],
      pago: [null, [Validators.required]],
      monto: [null],
      descuento: [null],
    });
  }

  getErrorRequerido(){
    return 'Este campo es requerido';
  }

  get formulario() {
    return this.formMembresia.controls;
  }

  validarGenerales(){
    let validacion = true;

    if(this.formMembresia.invalid){
      Object.keys(this.formMembresia.controls).forEach((field) => {
          const control = this.formMembresia.get(field);
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
