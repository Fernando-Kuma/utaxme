import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ClienteService } from 'src/app/shared/service/cliente.service';
import { EspacioTrabajoService } from 'src/app/shared/service/espacio-trabajo.service';


@Component({
  selector: 'app-crear-concepto',
  templateUrl: './crear-concepto.component.html',
  styleUrls: ['./crear-concepto.component.css']
})
export class CrearConceptoComponent {


  usuarioAdmin: boolean = false;
  public form: FormGroup;
  opcionCrear: boolean = true;
  filteredOptions: Observable<any[]>;
  listaCatalogoProductos: any[];
  catalogoImpuestos: any[];
  titulo: string = 'Crear nuevo concepto'

  constructor(
    public dialogRef: MatDialogRef<CrearConceptoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private espacioTrabajoService: EspacioTrabajoService,
    private clienteService: ClienteService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.usuarioAdmin = this.data.usuario == 'administrador'
    this.crearForm();
    this.obtenerCatalogos();
    if(this.usuarioAdmin){
      if(this.data.metodo === 'editar'){
        this.titulo = 'Editar concepto'
        this.opcionCrear = false
        this.modificarForm()
      }
    }else{
      if(this.data.metodo === 'editar'){
        this.titulo = 'Editar concepto'
        this.opcionCrear = false
        this.modificarForm()
      }
    }
  }

  obtenerCatalogos(){
    this.espacioTrabajoService.obtenerCatalogoForm()
      .subscribe((response) => {
      this.catalogoImpuestos = response.catalogoImpuestosLocales;
    },(_error) => {
      console.log("Error en catalogo: ", _error);
    }
    );
  }

  modificarForm(){
    this.form.get('nombreProducto').setValue(this.data.concepto.productoServicio);
    this.form.get('clavaProducto').setValue(this.data.concepto.identificadorSat);
    this.form.get('unidad').setValue(this.data.concepto.unidad);
    this.form.get('clavaUnidad').setValue(this.data.concepto.claveUnidad);
    this.form.get('valorUnitario').setValue(this.data.concepto.valorUnitario);
    this.form.get('descripcion').setValue(this.data.concepto.descripcion);

    if(this.data.concepto.tasa != null){
      this.form.get('impuestoT').setValue(true);
      this.form.get('iva').setValue(this.data.concepto.tasa);
      this.form.get('ieps').setValue(this.data.concepto.ieps);
    }

    if(this.data.concepto.isrRet != null){
      this.form.get('impuestoR').setValue(true);
      this.form.get('isr').setValue(this.data.concepto.isrRet);
      this.form.get('ivaR').setValue(this.data.concepto.ivaRet);
    }

    if(this.data.concepto.claveImpuestoLocal != null){
      this.form.get('impuestoL').setValue(true);
      this.form.get('impuestoLocal').setValue(this.data.concepto.claveImpuestoLocal);
      this.form.get('tasaLocal').setValue(this.data.concepto.tasaLocal);
    }

  }

  crearForm(){
    this.form = this.formBuilder.group({      
      buscar: [''],
      nombreProducto: [null, [Validators.required]],
      clavaProducto: [null, [Validators.required]],
      unidad: [null, [Validators.required]],
      clavaUnidad: [null, [Validators.required]],
      valorUnitario: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      impuestoT: [null],
      impuestoR: [null],
      impuestoL: [null],
      iva: [null],
      ieps: [null],
      isr: [null],
      ivaR: [null],
      impuestoLocal: [null],
      tasaLocal: [null],
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  /* onKeyDownEvent(event: any){
    let busquedaDeDatos;
    let filtro = event.target.value;
    this.tablaLista = this.tablaListaConceptos.filter( item => 
    item?.descripcion.toLowerCase().includes(filtro.toLowerCase())
    )
  } */

  catalogoProductos(event: any){
    event.preventDefault()
    console.log(this.form.controls['buscar'].value)
    if(this.form.controls['buscar'].value != null ){
      this.espacioTrabajoService.obtenerCatalogoProductos(this.form.controls['buscar'].value)
        .subscribe((resp) => {
          this.listaCatalogoProductos = resp.catalogoProductos;

          this.filteredOptions = this.form.controls['buscar'].valueChanges.pipe(
            startWith(''),
            map(value => value ? this._filter(value) : this.listaCatalogoProductos.slice()),
          );

        },(_error) => {
          console.log("::Entro al error Datos fiscales: ", _error);
      }
      );
    }
  }

  seleccionConcepto(concepto?: any){
    this.form.get('clavaProducto').setValue(concepto.identificador);
    this.form.get('descripcion').setValue(concepto.descripcion);
    this.form.get('unidad').setValue(concepto.unidad);
    this.form.get('clavaUnidad').setValue(concepto.claveUnidad);
  }

  guardarConcepto(){
    console.log('saludos')
    if(this.form.invalid){
      Object.keys(this.form.controls).forEach((field) => {
          const control = this.form.get(field);
          if (!control.valid) {
              control.markAsTouched({ onlySelf: true });
          }
      });
      return;
    }

    if(this.form.controls['ivaR'].value > 0 && this.form.controls['iva'].value <= 0 ){
      this.form.get('iva')?.setErrors({ impuesto: true });
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        if (!control.valid) {
            control.markAsTouched({ onlySelf: true });
        }
      });
      return
    }
    
    

    if(this.usuarioAdmin){
      let request = {
        productoServicio: this.form.controls['nombreProducto'].value.toUpperCase(),
        identificadorSat: this.form.controls['clavaProducto'].value,
        descripcion: this.form.controls['descripcion'].value.trim().toUpperCase(),
        claveUnidad: this.form.controls['clavaUnidad'].value.trim().toUpperCase(),
        claveImpuestoSat: "002", //ok  fijo
        tasa: this.form.controls['impuestoT'].value ? this.form.controls['iva'].value : null,
        idCliente: this.auth.adminClave.idCliente,
        rfc: localStorage.getItem('rfc-cliente'),
        unidad: this.form.controls['unidad'].value,
        valorUnitario: this.form.controls['valorUnitario'].value,
        claveImpuestoLocal: this.form.controls['impuestoL'].value ? this.form.controls['impuestoLocal'].value : null,
        tasaLocal: this.form.controls['impuestoL'].value ? this.form.controls['tasaLocal'].value : null,
        isrRet: this.form.controls['impuestoR'].value ? this.form.controls['isr'].value : null,
        ivaRet: this.form.controls['impuestoR'].value ? this.form.controls['ivaR'].value : null,
        ieps: this.form.controls['impuestoT'].value ? this.form.controls['ieps'].value : null,

        idConceptoCliente: 0
      }
      if(this.opcionCrear){
        delete request.idConceptoCliente
      }else{
        request.idConceptoCliente = this.data.concepto.idConceptoCliente
      }

      this.clienteService.actualizarConcepto(request)
      .subscribe((resp) => {
        console.log(resp)
        //agregar alerta de listo
        this.dialogRef.close(true);
      },(_error) => {
        console.log("::Entro al error Datos fiscales: ", _error);
      });

    }else{
      let request = {
        productoServicio: this.form.controls['nombreProducto'].value.toUpperCase(),
        identificadorSat: this.form.controls['clavaProducto'].value,
        descripcion: this.form.controls['descripcion'].value.trim().toUpperCase(),
        claveUnidad: this.form.controls['clavaUnidad'].value.trim().toUpperCase(),
        rfc: this.auth.usuario.cliente.rfc,
        unidad: this.form.controls['unidad'].value,
        valorUnitario: this.form.controls['valorUnitario'].value,
        claveImpuestoSat: "002", //ok  fijo
        tasa: this.form.controls['impuestoT'].value ? this.form.controls['iva'].value : null,
        ieps: this.form.controls['impuestoT'].value ? this.form.controls['ieps'].value : null,

        isrRet: this.form.controls['impuestoR'].value ? this.form.controls['isr'].value : null,
        ivaRet: this.form.controls['impuestoR'].value ? this.form.controls['ivaR'].value : null,

        claveImpuestoLocal: this.form.controls['impuestoL'].value ? this.form.controls['impuestoLocal'].value : null,
        tasaLocal: this.form.controls['impuestoL'].value ? this.form.controls['tasaLocal'].value : null,
        idConceptoCliente: 0
      }

      if(this.opcionCrear){
        this.espacioTrabajoService.crearNuevoConcepto(request)
        .subscribe((resp) => {
          //agregar alerta de listo
          this.dialogRef.close(true);
        },(_error) => {
          console.log("::Entro al error Datos fiscales: ", _error);
        });
      }else{
        request.idConceptoCliente = this.data.concepto.idConceptoCliente
        this.espacioTrabajoService.actualizarConcepto(request)
        .subscribe((resp) => {
          //agregar alerta de listo
          this.dialogRef.close(true);
        },(_error) => {
          console.log("::Entro al error Datos fiscales: ", _error);
        });
      }
    }
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.listaCatalogoProductos;
  }

  get formulario() {
    return this.form.controls;
  }

  getErrorRequerido(){
    return 'Este campo es requerido';
  }

  public validarCaracteres(event, input) {
    let k = event.target.value;
    let reg = /^[0-9]{1,}?(\.[0-9]{0,4})?$/g;
    if(k == '' || k == null){
      return
    } 
    if(!reg.test(k)){
      this.form.get(input)?.setErrors({ valor: true });
    }
    if((input == 'iva' || input == 'ivaR' ) && k > 16){
      this.form.get(input)?.setErrors({ mayor: true });
    }
    if((input == 'ivaR' || input == 'iva') && this.form.controls['ivaR'].value > 0 && this.form.controls['iva'].value <= 0 ){
      this.form.get('iva')?.setErrors({ impuesto: true });
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        if (!control.valid) {
            control.markAsTouched({ onlySelf: true });
        }
    });
    }
  }

  public onlyNumbers(event) {
    let k;
    k = event.charCode;
    return (!(k > 31 && (k < 48 || k > 57) && k != 46));
  }

  public get width() {
    return window.innerWidth;
  }
  
  public onKey(event) {
    event.preventDefault()
  }
}
