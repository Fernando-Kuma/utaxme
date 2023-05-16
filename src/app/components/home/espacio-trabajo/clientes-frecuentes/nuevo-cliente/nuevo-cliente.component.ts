import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';
import { EspacioTrabajoService } from 'src/app/shared/service/espacio-trabajo.service';


@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent {

  public form: FormGroup;
  opcionCrear: boolean = true;
  catalogos: any;
  
  constructor(
    public dialogRef: MatDialogRef<NuevoClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private espacioTrabajoService: EspacioTrabajoService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.crearForm();
    this.obtenerCatalogos();
    if(this.data.metodo === 'editar'){
      this.opcionCrear = false
      this.modificarForm()
    }
    console.log(this.data.cliente)
  }

  obtenerCatalogos(){
    this.espacioTrabajoService.obtenerCatalogoForm()
      .subscribe((response) => {
        this.catalogos = response;
    },(_error) => {
      console.log("Error en catalogo: ", _error);
    }
    );
  }

  modificarForm(){
    this.form.get('rfc').setValue(this.data.cliente.rfcReceptor);
    this.form.get('razonSocial').setValue(this.data.cliente.razonSocial);
    this.form.get('regimenFiscal').setValue(this.data.cliente.regimenFiscal);
    this.form.get('codigoPostal').setValue(this.data.cliente.codigoPostal);
    this.form.get('correo').setValue(this.data.cliente.correoElectronico);
  }

  crearForm(){
    this.form = this.formBuilder.group({      
      rfc: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(13), Validators.pattern("^[A-Za-z0-9]+$")]],
      razonSocial: [null, [Validators.required, Validators.minLength(3)]],
      regimenFiscal: [null, [Validators.required]],
      codigoPostal: [null, [Validators.required, Validators.minLength(5)]],
      correo: [null, [Validators.required, Validators.pattern(".+@.+\..+")]],
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  guardarCliente(){
    if(this.form.invalid){
      Object.keys(this.form.controls).forEach((field) => {
          const control = this.form.get(field);
          if (!control.valid) {
              control.markAsTouched({ onlySelf: true });
          }
      });
      return;
    }
    if(this.form.valid){
      let request: any;
      request = {
        rfcCliente: this.auth.usuario.cliente.rfc,
        rfcReceptor: this.form.controls['rfc'].value,
        razonSocial: this.form.controls['razonSocial'].value,
        correoElectronico: this.form.controls['correo'].value,
        regimenFiscal: this.form.controls['regimenFiscal'].value,
        codigoPostal: this.form.controls['codigoPostal'].value,
      }
      if(this.opcionCrear){
        this.espacioTrabajoService.crearCliente(request).subscribe((response) => {
          console.log(response)
        },(_error) => {
          console.log("Error en crear cliente: ", _error);
        });
        this.dialogRef.close(true);
      }else{
        request.idEmisionServicios = this.data.cliente.idEmisionServicios
        this.espacioTrabajoService.editarCliente(request).subscribe((response) => {
          console.log(response)
        },(_error) => {
          console.log("Error en crear cliente: ", _error);
        });
        this.dialogRef.close(true);
      }
    }
    
  }

  get formulario() {
    return this.form.controls;
  }

  public get width() {
    return window.innerWidth;
  }
  
  getErrorRequerido(){
    return 'Este campo es requerido';
  }

  public onlyNumbers(event) {
    let k;
    k = event.charCode;
    return (!(k > 31 && (k < 48 || k > 57)));
  }

  public caracteresValidosRFC(event) {
    let k = event.key;
    let reg = /^[A-Za-z0-9]+$/g;
    if(!reg.test(k)){
      return false
    }
  }
  public caracteresValidosRS(event) {
    let k = event.key;
    let reg = /^[ñÑA-Za-z0-9-. ]+$/g;
    if(!reg.test(k)){
      return false
    }
  }
  
  public setMayusculas(event, form){
    this.form.controls[form].setValue(event.target.value.toUpperCase())
  }


}
