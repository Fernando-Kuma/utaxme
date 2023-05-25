import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/shared/service/catalogos.service';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.css']
})
export class MembresiaComponent implements OnInit {

  Paquetes : any= [];

  public formMembresia: FormGroup;
  dias: number[] = Array.from({length:31},(v,k)=>k+1);
  formasPago: any = [];
  @Output()
  validForm : EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private formBuilder: FormBuilder,
    private catalogoService: CatalogosService) { 
  }

  ngOnInit(): void {
    this.crearForm();
    this.obtenerPaquetes();
    this.obtenerFormaPago();
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
    if(this.formMembresia.touched){
      if(this.formMembresia.invalid){
        Object.keys(this.formMembresia.controls).forEach((field) => {
            const control = this.formMembresia.get(field);
            if (!control.valid) {
                control.markAsTouched({ onlySelf: true });
            }
        });
        validacion = false
      }
    }else{
      validacion = true;
    }

    if(validacion){
      console.log("Formulario lleno")
      this.validarForm();
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

  obtenerFormaPago(){
    this.catalogoService.obtenerFormasPago()
      .subscribe((response) => {
        console.log("formasPago:",response);
        this.formasPago = response;
      },(_error) => {
        console.log("Error en obtener regimen: ", _error);
      });
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
        this.formMembresia.get('monto')?.setErrors({ incorrectText: true });
        this.formMembresia.get('descuento')?.setErrors({ incorrectText: true });
      }
    }
  }

  validarForm(){
    this.validForm.emit(true);
  }
}
