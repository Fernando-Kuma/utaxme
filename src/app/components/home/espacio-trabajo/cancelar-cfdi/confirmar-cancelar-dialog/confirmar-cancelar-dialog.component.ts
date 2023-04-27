import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CancelarDialogComponent } from '../cancelar-dialog/cancelar-dialog.component';
import { DialogService } from 'src/app/shared/service/dialog.service';

@Component({
  selector: 'app-confirmar-cancelar-dialog',
  templateUrl: './confirmar-cancelar-dialog.component.html',
  styleUrls: ['./confirmar-cancelar-dialog.component.css']
})
export class ConfirmarCancelarDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmarCancelarDialogComponent>,
    public dialogRef2: MatDialogRef<CancelarDialogComponent>,
    public dialog: MatDialog,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close(false);
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

}
