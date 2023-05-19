import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.crearForm();
   }

  ngOnInit(): void {
  }

  crearForm(){
    this.form = this.formBuilder.group({
      razonSocial: [null, [Validators.required]]
    });
  }

  getErrorRequerido(){
    return 'Este campo es requerido';
  }

  get formulario() {
    return this.form.controls;
  }

}
