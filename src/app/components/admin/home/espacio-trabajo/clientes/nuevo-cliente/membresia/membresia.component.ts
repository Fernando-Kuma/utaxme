import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/shared/service/catalogos.service';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.css']
})
export class MembresiaComponent implements OnInit {

  Paquetes = [];

  public formMembresia: FormGroup;
  dias: number[] = Array.from({length:31},(v,k)=>k+1);;
  constructor(private formBuilder: FormBuilder,
    private catalogoService: CatalogosService) { 
  }

  ngOnInit(): void {
    this.crearForm();
    this.obtenerPaquetes();
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

  obtenerPaquetes(){
    this.catalogoService.obtenerRegimenFiscales()
      .subscribe((response) => {
        console.log("Regimens:",response);
        this.Paquetes = response;
      },(_error) => {
        console.log("Error en obtener regimen: ", _error);
      });
  }
}
