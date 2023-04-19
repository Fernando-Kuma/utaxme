import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GenericDialogModel } from '../../model/confirm-dialog';

@Component({
  selector: 'app-detalle-deduc-personal',
  templateUrl: './detalle-deduc-personal.component.html',
  styleUrls: ['./detalle-deduc-personal.component.css']
})
export class DetalleDeducPersonalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DetalleDeducPersonalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GenericDialogModel
  ) { }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  confirmDialog() {
    this.dialogRef.close(true);
  }

}
