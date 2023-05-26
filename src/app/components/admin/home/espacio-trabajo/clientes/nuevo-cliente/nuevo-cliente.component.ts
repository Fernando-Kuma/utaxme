import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatTabGroup } from '@angular/material/tabs';
import { CatalogosService } from 'src/app/shared/service/catalogos.service';
import { ClienteService } from 'src/app/shared/service/cliente.service';
import { AlertService } from 'src/app/shared/utils/alertas';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {

  @ViewChild('selectDispositivo') selectDispositivo;
  @ViewChild('selectDispositivo') matRef: MatSelect;
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  public formCliente: FormGroup;
  public formContadores: FormGroup;
  Options = [];
  selectable = true;
  removable = true;
  indexTab: number = 0;

  formValidados = [];

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NuevoClienteComponent>,
    private catalogoService: CatalogosService,
    private clienteService: ClienteService,
    private alertService: AlertService) {
    this.crearForm();
   }

  ngOnInit(): void {
    this.obtenerContadores();
    localStorage.setItem('generales','0');
    localStorage.setItem('domicilio','0');
    this.seterObjeto();
  }
  seterObjeto() {
    localStorage.removeItem('bodyCliente');
    let body = {
      rfc : '',
      idRegimenFiscal : [],
      email : '',
      celular : '',
      observaciones : '',
      nombre: '',
      domicilio: {
        calle: '',
        numeroExt: '',
        numeroInt: '',
        idEntidadFederativa: '',
      },
      membresia: {
        idPaquete: 0,
        claveFormaPago: '',
        diaPago: 0,
        descuento: 0,
        montoMensual: 0
      },
      idContadores: []
    }
    console.log("Body:",body);
    localStorage.setItem('bodyCliente', JSON.stringify(body));
  }

  crearForm(){
    this.formCliente = this.formBuilder.group({
      razonSocial: [null, [Validators.required]]
    });
    this.formContadores = this.formBuilder.group({
      contadores: [null, [Validators.required]]
    });
  }

  getErrorRequerido(){
    return 'Este campo es requerido';
  }

  get formulario() {
    return this.formCliente.controls;
  }

  get formularioContadores() {
    return this.formContadores.controls;
  }

  close(){
    this.dialogRef.close();
  }

  removeService(index: number, item: any){
    this.matRef.options.forEach((data: MatOption) => {      
      if(item === data.value){
        data.deselect();
      }
    });
  }

  obtenerContadores(){
    this.catalogoService.obtenerContadores()
      .subscribe((response) => {
        console.log("Contadores:",response);
        this.Options = response;
      },(_error) => {
        console.log("Error en obtener contadores: ", _error);
      });
  }

  obtenerValor(event){
    this.indexTab = event;
  }

  onTabChanged(event){
    this.indexTab = event;
  }

  validarFormulario(){
    let validacion = true;
    if(this.formCliente.invalid){
      Object.keys(this.formCliente.controls).forEach((field) => {
          const control = this.formCliente.get(field);
          if (!control.valid) {
              control.markAsTouched({ onlySelf: true });
          }
      });
      validacion = false
    }
    if(validacion){
      let generales = localStorage.getItem('generales');
      let domicilio = localStorage.getItem('domicilio');
      if(generales == '1' && domicilio == '1'){
        console.log('Se puede guardar el formulario final')
        this.guardarCliente();
      }else{
        console.log('No se puede guardar el formulario')
        this.alertService.error('<b>Favor de llenar Generales y Domicilio para guardar.</b>');
      }
    }else{
      console.log('No se puede guardar el formulario completo')
    }
  }

  guardarCliente(){

    let body = JSON.parse(localStorage.getItem('bodyCliente'));
    body.nombre = this.formCliente.get('razonSocial').value;
    console.log("BodyFinal:",body);
    this.clienteService.guardarCliente(body)
      .subscribe((response) => {
        console.log("Response:",response);
        this.alertService.success('<b>Se guardo correctamente el cliente.</b>');
        this.close();
      },(_error) => {
        console.log("Error al guardar cliente: ", _error);
      });
  }


  validarFormularioCertificado(){
    let validacion = true;
    if(this.formContadores.touched){
      if(this.formContadores.invalid){
        Object.keys(this.formContadores.controls).forEach((field) => {
            const control = this.formContadores.get(field);
            if (!control.valid) {
                control.markAsTouched({ onlySelf: true });
            }
        });
        validacion = false
      }
    }

    if(validacion){
        console.log('Se puede guardar el formulario')
        this.validarFormulario();
    }else{
      console.log('No se puede guardar el formulario completo')
    }
  }

}
