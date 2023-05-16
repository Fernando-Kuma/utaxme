import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-service-error-dialog',
  templateUrl: './service-error-dialog.component.html'
})
export class ServiceErrorDialogComponent implements OnInit {

  error:boolean = false;
  cerrarSesion: boolean = true;
  tipoError: boolean = true;

  constructor(public dialogRef: MatDialogRef<ServiceErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
    if(this.data){
      this.cerrarSesion = this.data.cerrarSesion;
      this.tipoError = this.data.tipoError == "Servicio"
    }
  }

  close(){
    this.dialogRef.close();
  }

  reintentar(){
    this.dialogRef.close(this.data.numero);
  }

  logout(){
    this.dialogRef.close(false);
  }
}
