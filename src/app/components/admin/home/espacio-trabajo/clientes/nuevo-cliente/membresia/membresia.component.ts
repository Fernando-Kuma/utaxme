import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from 'src/app/shared/service/catalogos.service';

@Component({
  selector: 'app-membresia',
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.css']
})
export class MembresiaComponent implements OnInit {


  _tabs: number = -1;
  @Input() set tabs(val: number) {
    if(val >= 0){
      console.log("Cambiaste de TabMembresia")
      this.guardarGenerales();
    }
  }
  
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
      pago: ['', [Validators.required]],
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
      this.guardarGenerales();
      this.validarForm();
    }else{
      console.log("Formulario no lleno")
    }
  }

  obtenerPaquetes(){
    this.catalogoService.obtenerPaquetes()
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

  guardarGenerales(){
    let body = JSON.parse(localStorage.getItem('bodyCliente'));
    body.membresia.idPaquete = this.formMembresia.get('paquete').value ? this.formMembresia.get('paquete').value : 0;
    body.membresia.claveFormaPago = this.formMembresia.get('pago').value;
    body.membresia.diaPago = this.formMembresia.get('dia').value ? this.formMembresia.get('dia').value : 0;
    body.membresia.descuento = this.formMembresia.get('descuento').value ? this.formMembresia.get('descuento').value : 0;
    body.membresia.montoMensual = this.formMembresia.get('monto').value ? this.formMembresia.get('monto').value : 0;
    console.log("Body:",body);
    localStorage.setItem('bodyCliente', JSON.stringify(body));
  }
}
