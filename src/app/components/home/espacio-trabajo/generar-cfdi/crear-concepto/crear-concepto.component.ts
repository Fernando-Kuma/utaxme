import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthService } from 'src/app/shared/service/auth.service';
import { EspacioTrabajoService } from 'src/app/shared/service/espacio-trabajo.service';


@Component({
  selector: 'app-crear-concepto',
  templateUrl: './crear-concepto.component.html',
  styleUrls: ['./crear-concepto.component.css']
})
export class CrearConceptoComponent {


  public form: FormGroup;
  opcionCrear: boolean = true;
  filteredOptions: Observable<any[]>;
  listaCatalogoProductos: any[];
  catalogoImpuestos: any[];
  
  constructor(
    public dialogRef: MatDialogRef<CrearConceptoComponent>,
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
      this.form.get('iepsISR').setValue(this.data.concepto.ivaRet);
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
      iepsISR: [null],
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
    let request = {
        productoServicio: this.form.controls['nombreProducto'].value.toUpperCase(),
        identificadorSat: this.form.controls['clavaProducto'].value,
        descripcion: this.form.controls['descripcion'].value.trim().toUpperCase(),
        claveUnidad: this.form.controls['clavaUnidad'].value.trim().toUpperCase(),
        rfc: this.auth.usuario.cliente.rfc,
        unidad: this.form.controls['unidad'].value,
        valorUnitario: this.form.controls['valorUnitario'].value,
        claveImpuestoSat: "002", //ok  fijo
        tasa: this.form.controls['iva'].value,
        ieps: this.form.controls['ieps'].value,
        isrRet: this.form.controls['isr'].value,
        ivaRet: this.form.controls['iepsISR'].value,
        claveImpuestoLocal: this.form.controls['impuestoLocal'].value,
        tasaLocal: this.form.controls['tasaLocal'].value,
        idConceptoCliente: 0
    }
    if(this.opcionCrear){
      this.espacioTrabajoService.crearNuevoConcepto(request)
      .subscribe((resp) => {
        console.log(resp)
        //agregar alerta de listo
        this.closeDialog()
      },(_error) => {
        console.log("::Entro al error Datos fiscales: ", _error);
      });
    }else{
      this.espacioTrabajoService.actualizarConcepto(request)
      .subscribe((resp) => {
        console.log(resp)
        //agregar alerta de listo
        this.closeDialog()
      },(_error) => {
        console.log("::Entro al error Datos fiscales: ", _error);
      });
    }
    
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    console.log(filterValue)
    //return this.listaCatalogoProductos.filter(item => item.descripcion.toLowerCase().includes(filterValue));
    return this.listaCatalogoProductos;
  }

  get formulario() {
    return this.form.controls;
  }

  getErrorRequerido(){
    return 'Este campo es requerido';
  }

}
