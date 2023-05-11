import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CancelarDialogComponent } from '../cancelar-dialog/cancelar-dialog.component';
import { DialogService } from 'src/app/shared/service/dialog.service';

@Component({
  selector: 'app-confirmar-cancelar-dialog',
  templateUrl: './confirmar-cancelar-dialog.component.html',
  styleUrls: ['./confirmar-cancelar-dialog.component.css']
})
export class ConfirmarCancelarDialogComponent implements OnInit {

  referencia = this.data.cfdi.referencia;
  motivo = this.data.motivo;
  total = this.data.cfdi.total;
  uidd = this.data.cfdi.uidd;

  constructor(
    public dialogRef: MatDialogRef<ConfirmarCancelarDialogComponent>,
    public dialogRef2: MatDialogRef<CancelarDialogComponent>,
    public dialogRef3: MatDialogRef<CancelarDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    
  }

  closeDialog(close: boolean) {
    this.dialogRef.close(close);
  }

  regresar(cfdi: any) {
    const dialogRef = this.dialog.open(
      CancelarDialogComponent, 
      this.dialogService.cancelarCfdi(cfdi)
    );
    dialogRef.afterClosed().subscribe(
      data => {
      }
    );
  }

  cancelar(){
    this.dialogRef3.close(true);
    /* this.closeDialog(true); */
  }

}
