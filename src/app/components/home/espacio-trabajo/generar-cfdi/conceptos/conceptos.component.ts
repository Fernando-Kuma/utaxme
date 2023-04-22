import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CrearConceptoComponent } from '../crear-concepto/crear-concepto.component';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { EspacioTrabajoService } from 'src/app/shared/service/espacio-trabajo.service';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-conceptos',
  templateUrl: './conceptos.component.html',
  styleUrls: ['./conceptos.component.css']
})
export class ConceptosComponent{

  checked = false;
  tablaListaConceptos: any; 
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
  }

  crearForm(){
    this.form = this.formBuilder.group({      
      busqueda: ['']
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  crearConcepto(){
    const dialogRef = this.dialog.open(
      CrearConceptoComponent, 
      this.dialogService.detalle()
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
      /* console.log('::RESP Datos Fiscales', this.response); */
    },(_error) => {
      console.log("::Entro al error Datos fiscales: ", _error);
    }
    );
  }

}
