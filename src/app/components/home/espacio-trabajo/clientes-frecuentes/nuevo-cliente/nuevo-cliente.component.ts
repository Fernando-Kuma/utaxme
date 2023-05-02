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
  catalogoImpuestos: any[];
  
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
    /* this.form.get('nombreProducto').setValue(this.data.concepto.productoServicio);
    this.form.get('clavaProducto').setValue(this.data.concepto.identificadorSat);
    this.form.get('unidad').setValue(this.data.concepto.unidad);
    this.form.get('clavaUnidad').setValue(this.data.concepto.claveUnidad);
    this.form.get('valorUnitario').setValue(this.data.concepto.valorUnitario);
    this.form.get('descripcion').setValue(this.data.concepto.descripcion); */

  }

  crearForm(){
    this.form = this.formBuilder.group({      
      rfc: [null, [Validators.required]],
      razonSocial: [null, [Validators.required]],
      regimenFiscal: [null, [Validators.required]],
      codigoPostal: [null, [Validators.required]],
      correo: [null, [Validators.required]],
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  guardarCliente(){
    let request = {
        rfc: 0,
        razonSocial: 0,
        regimenFiscal: 0,
        codigoPostal: 0,
        correo: 0
    }
    if(this.opcionCrear){
      this.closeDialog()
      
    }else{
      this.closeDialog()
    }
    
  }

  get formulario() {
    return this.form.controls;
  }

  getErrorRequerido(){
    return 'Este campo es requerido';
  }

}
