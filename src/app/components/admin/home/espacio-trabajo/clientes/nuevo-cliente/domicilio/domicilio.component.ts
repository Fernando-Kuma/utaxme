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

  Estados : [{id:number,descripcion:string}];
  constructor(private formBuilder: FormBuilder,
    private catalogoService: CatalogosService) { 
  }

  ngOnInit(): void {
    this.crearForm();
    this.obtenerEstados();
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

    this.formDomicilio.controls['estado'].disable();
    this.formDomicilio.controls['ciudad'].disable();
    this.formDomicilio.controls['colonia'].disable();
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
        this.formDomicilio.get('estado').setValue(response[0].tbCatEstado.idEstado);
        this.formDomicilio.get('ciudad').setValue(response[0].municipio);
      },(_error) => {
        console.log("Error en obtener contadores: ", _error);
        this.formDomicilio.controls['estado'].enable();
        this.formDomicilio.controls['ciudad'].enable();
        this.formDomicilio.controls['colonia'].enable();
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
    body.domicilio.colonia = this.formDomicilio.get('colonia').value;
    body.domicilio.numeroExt = this.formDomicilio.get('numeroext').value;
    /* body.domicilio.cp = this.formDomicilio.get('cp').value; */
    body.domicilio.estado = this.formDomicilio.get('estado').value;
    body.domicilio.municipio = this.formDomicilio.get('ciudad').value;
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
}
