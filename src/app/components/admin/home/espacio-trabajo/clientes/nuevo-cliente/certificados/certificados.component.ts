import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarCertificadoComponent } from './agregar-certificado/agregar-certificado.component';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent implements OnInit {

  @Output()
  validForm : EventEmitter<boolean> = new EventEmitter<boolean>();

  mostrar:number = 1;
  certificados:any;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    let valor = localStorage.getItem('certificado');
    if(valor){
      this.mostrar = Number(valor);
    }
  }

  openCertificadoDialog() {
    const dialogRef = this.dialog.open(
      AgregarCertificadoComponent,{
        width: '750px ',
        height: '850px ',
        disableClose: true
      }
    );

    dialogRef.afterClosed().subscribe((_) => {
      this.mostrar = _.pantalla;
      this.certificados = _.file;
      localStorage.setItem('certificado',String(this.mostrar));
    });
  }

  validarForm(){
    this.validForm.emit(true);
  }
}
