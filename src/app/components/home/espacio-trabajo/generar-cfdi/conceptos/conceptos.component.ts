import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CrearConceptoComponent } from '../crear-concepto/crear-concepto.component';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { EspacioTrabajoService } from 'src/app/shared/service/espacio-trabajo.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Conceptos } from 'src/app/shared/model/espacio-trabajo.model';
import { ConfirmDialogComponent } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.service';
import { AlertService } from 'src/app/shared/utils/alertas';

@Component({
  selector: 'app-conceptos',
  templateUrl: './conceptos.component.html',
  styleUrls: ['./conceptos.component.css']
})
export class ConceptosComponent{

  tablaListaConceptos: Conceptos[]; 
  tablaLista: Conceptos[]; 
  public form: FormGroup;

  constructor(
    private alertService: AlertService,
    public dialogRef: MatDialogRef<ConceptosComponent>,
    public dialogService: DialogService,
    public dialogServiceConfirm: ConfirmDialogService,
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
    this.dialogRef.close(this.data.conceptos);
  }

  confirmDialog() {
    let listaConcepto = this.tablaListaConceptos.filter(ele => ele.estatus)
    let condicionISH = listaConcepto.filter(ele => ele.tasaLocal > 0)
    if(condicionISH.length <= 1){
      this.dialogRef.close(listaConcepto);
    }else{
      this.alertService.error('<b>Solo puedes añadir un concepto con una Tasa Trasladado.</b>');
    }

  }

  crearConcepto(){
    const dialogRef = this.dialog.open(
      CrearConceptoComponent, 
      this.dialogService.crearConceto()
    );
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          const dialogRefConfirm = this.dialog.open( ConfirmDialogComponent, this.dialogServiceConfirm.nuevoConcepto() );
          dialogRefConfirm.afterClosed().subscribe( data => { this.listaConceptos() });
        }
      }
    );
  }

  editarConcepto(concepto: any){
    const dialogRef = this.dialog.open(
      CrearConceptoComponent, 
      this.dialogService.editarConcepto(concepto)
    );
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          const dialogRefConfirm = this.dialog.open( ConfirmDialogComponent, this.dialogServiceConfirm.editarConcepto() );
          dialogRefConfirm.afterClosed().subscribe( data => { this.listaConceptos() });
        }
      }
    );
  }

  borrarConcepto(concepto: any){
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent, 
      this.dialogServiceConfirm.eliminarConcepto()
    );
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.espacioTrabajoService.eliminarConcepto(concepto.idConceptoCliente)
            .subscribe((resp) => {
              console.log(resp)
              this.listaConceptos()
            },(_error) => {
              console.log("::Entro al error Datos fiscales: ", _error);
            });
        }
      }
    );
  }

  listaConceptos(){
    let request = {
      rfc: this.auth.usuario.cliente.rfc
    }
    this.espacioTrabajoService.obtenerListaConceptos(request).subscribe((resp) => {
      resp.listaConceptos.forEach(element => {
        element.cantidad = 0;
        element.descuento = 0;
        element.importe = 0;
      });
      this.tablaListaConceptos = resp.listaConceptos;
      if(this.data.conceptos != null){
        this.tablaListaConceptos.forEach(element => {
          this.data.conceptos.forEach(ele => {
            if(ele.idConceptoCliente == element.idConceptoCliente){
              element.estatus = ele.estatus
              element.descuento = ele.descuento
              element.cantidad = ele.cantidad
              element.importe = ele.importe;
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
    let filtro = event.target.value;
    this.tablaLista = this.tablaListaConceptos.filter( item => 
    item?.descripcion.toLowerCase().includes(filtro.toLowerCase())
    )
  }

  public get width() {
    return window.innerWidth;
  }
}
