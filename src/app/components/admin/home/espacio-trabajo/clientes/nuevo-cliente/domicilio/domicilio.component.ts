import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  colonias = [];

  Estados : [{id:number,descripcion:string}];

  _tabs: number = -1;
  @Input() set tabs(val: number) {
    if(val >= 0){
      console.log("Cambiaste de Tabdomicilio:",val)
      if(val == 1){
        this.validarDomicilioTab();
      }else{
        this.validarDomicilioTab();
      }
    }
  }
  constructor(private formBuilder: FormBuilder,
    private catalogoService: CatalogosService) { 
  }

  ngOnInit(): void {
    this.crearForm();
    this.obtenerEstados();
  }

  crearForm(){
    this.formDomicilio = this.formBuilder.group({
      domicilio: ['', [Validators.required]],
      colonia: [null, [Validators.required]],
      numeroext: ['', [Validators.required]],
      cp: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      numeroint: [''],
    });
    this.formDomicilio.controls['colonia'].disable();
    this.formDomicilio.controls['estado'].disable();
    this.formDomicilio.controls['ciudad'].disable();
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
      this.guardarDomicilio();
      this.cambiarTab();      
    }else{
      console.log("Formulario no lleno")
      localStorage.setItem('domicilio','0');
    }
  }

  buscarCP(){
    this.colonias = [];
    let cp = this.formDomicilio.get('cp').value;
    console.log("CP:",cp);
    if(cp.length == 5){
      this.catalogoService.obtenerCP(cp)
      .subscribe((response) => {
        console.log("CP:",response[0]);
        response.forEach(element => {
          this.colonias.push({id: element.idEntidadFed, colonia: element.colonia});
        });
        this.formDomicilio.controls['colonia'].enable();
        this.formDomicilio.get('estado').setValue(response[0].tbCatEstado.idEstado);
        this.formDomicilio.get('ciudad').setValue(response[0].municipio);
      },(_error) => {
        console.log("Error en obtener contadores: ", _error);
        this.formDomicilio.controls['estado'].enable();
        this.formDomicilio.controls['ciudad'].enable();
      });
    }else{
      return;
    }
  }

  cambiarTab(){
    this.validForm.emit(true);
  }

  obtenerEstados(){
    this.catalogoService.obtenerEstados()
      .subscribe((response) => {
        console.log("Estados:",response);
        this.Estados = response;
      },(_error) => {
        console.log("Error en obtener contadores: ", _error);
      });
  }

  guardarDomicilio(){
    let body = JSON.parse(localStorage.getItem('bodyCliente'));
    body.domicilio.calle = this.formDomicilio.get('domicilio').value;
    body.domicilio.idEntidadFederativa = this.formDomicilio.get('colonia').value;
    body.domicilio.numeroExt = this.formDomicilio.get('numeroext').value;
    body.domicilio.numeroInt = this.formDomicilio.get('numeroint').value;
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
        this.formDomicilio.get('cp')?.setErrors({ incorrectText: true });
        this.formDomicilio.get('numeroint')?.setErrors({ incorrectText: true });
        this.formDomicilio.get('numeroext')?.setErrors({ incorrectText: true });
      }
    }
  }

  validarDomicilioTab(){
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
      this.guardarDomicilio();  
    }else{
      console.log("Formulario no lleno")
      localStorage.setItem('domicilio','0');
    }
  }
}
