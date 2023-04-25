import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CrearConceptoComponent } from '../crear-concepto/crear-concepto.component';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { EspacioTrabajoService } from 'src/app/shared/service/espacio-trabajo.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Conceptos } from 'src/app/shared/model/espacio-trabajo.model';

@Component({
  selector: 'app-conceptos',
  templateUrl: './conceptos.component.html',
  styleUrls: ['./conceptos.component.css']
})
export class ConceptosComponent{

  checked = false;
  tablaListaConceptos: Conceptos[]; 
  tablaLista: Conceptos[]; 
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ConceptosComponent>,
    public dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private espacioTrabajoService: EspacioTrabajoService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.crearForm();
    this.listaConceptos()
  }

  crearForm(){
    this.form = this.formBuilder.group({      
      busqueda: ['']
    });
  }

  closeDialog() {
    let listaConcepto = this.tablaListaConceptos.filter(ele => ele.estatus)
    this.dialogRef.close(listaConcepto);
  }

  confirmDialog() {
    let listaConcepto = this.tablaListaConceptos.filter(ele => ele.estatus)
    this.dialogRef.close(listaConcepto);
  }

  crearConcepto(){
    const dialogRef = this.dialog.open(
      CrearConceptoComponent, 
      this.dialogService.crearConceto()
    );
    dialogRef.afterClosed().subscribe(
      data => {
        //this.crearTicket();
      }
    );
  }

  editarConcepto(concepto: any){
    console.log(concepto)
    const dialogRef = this.dialog.open(
      CrearConceptoComponent, 
      this.dialogService.editarConcepto(concepto)
    );
    dialogRef.afterClosed().subscribe(
      data => {
        //this.crearTicket();
      }
    );
  }

  listaConceptos(){
    let request = {
      rfc: this.auth.usuario.cliente.rfc
    }
    this.espacioTrabajoService.obtenerListaConceptos(request).subscribe((resp) => {
      this.tablaListaConceptos = resp.listaConceptos;
      if(this.data.conceptos != null){
        this.tablaListaConceptos.forEach(element => {
          this.data.conceptos.forEach(ele => {
            if(ele.idConceptoCliente == element.idConceptoCliente){
              element.estatus = ele.estatus
            }
          });
        });
      }
      this.tablaLista = this.tablaListaConceptos
    },(_error) => {
      console.log("::Entro al error Datos fiscales: ", _error);
    });
  }

  onKeyDownEvent(event: any){
    let busquedaDeDatos;
    let filtro = event.target.value;
    this.tablaLista = this.tablaListaConceptos.filter( item => 
    item?.descripcion.toLowerCase().includes(filtro.toLowerCase())
    )
  }

}
