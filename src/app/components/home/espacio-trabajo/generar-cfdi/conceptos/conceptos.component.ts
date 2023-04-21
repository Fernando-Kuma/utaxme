import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CrearConceptoComponent } from '../crear-concepto/crear-concepto.component';
import { DialogService } from 'src/app/shared/service/dialog.service';

@Component({
  selector: 'app-conceptos',
  templateUrl: './conceptos.component.html',
  styleUrls: ['./conceptos.component.css']
})
export class ConceptosComponent{

  checked = false;
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ConceptosComponent>,
    public dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
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

}
