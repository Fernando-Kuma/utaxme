import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {

  public formCliente: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.crearForm();
   }

  ngOnInit(): void {
  }

  crearForm(){
    this.formCliente = this.formBuilder.group({
      razonSocial: [null, [Validators.required]]
    });
  }

  getErrorRequerido(){
    return 'Este campo es requerido';
  }

  get formulario() {
    return this.formCliente.controls;
  }

}
