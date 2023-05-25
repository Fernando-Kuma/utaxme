import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/shared/service/catalogos.service';

@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.component.html',
  styleUrls: ['./domicilio.component.css']
})
export class DomicilioComponent implements OnInit {

  public formDomicilio: FormGroup;
  @Output()
  validForm : EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private formBuilder: FormBuilder,
    private catalogoService: CatalogosService) { 
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
      localStorage.setItem('domicilio','1');
      this.cambiarTab();
    }else{
      console.log("Formulario no lleno")
      localStorage.setItem('domicilio','1');
    }
  }

  buscarCP(){
    let cp = this.formDomicilio.get('cp').value;
    console.log("CP:",cp);
    if(cp.length == 5){
      this.catalogoService.obtenerCP(cp)
      .subscribe((response) => {
        console.log("CP:",response[0]);
        this.formDomicilio.get('colonia').setValue(response[0].colonia);
        this.formDomicilio.get('estado').setValue(response[0].tbCatEstado.descripcion);
        this.formDomicilio.get('ciudad').setValue(response[0].municipio);
      },(_error) => {
        console.log("Error en obtener contadores: ", _error);
      });
    }else{
      return;
    }
  }

  cambiarTab(){
    this.validForm.emit(true);
  }
}
