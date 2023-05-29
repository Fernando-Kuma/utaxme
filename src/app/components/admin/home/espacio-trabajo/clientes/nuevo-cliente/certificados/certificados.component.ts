import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarCertificadoComponent } from './agregar-certificado/agregar-certificado.component';
import * as moment from 'moment';

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
  fecFin: Date;
  fecActual: Date;
  mensaje: string;
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
        disableClose: true,
        data: this.certificados
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

  validDate(fechaFinal) {
    let fecha = fechaFinal.split('/');
    this.fecFin = new Date((fecha[1]+'/'+fecha[0]+'/'+fecha[2]));
    let fechaFin = String(
      this.fecFin.getMonth() +
        1 +
        '/' +
        this.fecFin.getDate() +
        '/' +
        this.fecFin.getFullYear()
    );
    this.fecFin = new Date(fechaFin);
    this.fecActual = new Date();
    let fechaActual = String(
      this.fecActual.getMonth() +
        1 +
        '/' +
        this.fecActual.getDate() +
        '/' +
        this.fecActual.getFullYear()
    );
    this.fecActual = new Date(fechaActual);
    if (this.fecActual >= this.fecFin) {
      this.mensaje = "Activo";
    } else {
      this.mensaje = "Inactivo";
    }

    return this.mensaje;
  }

  borrarCertificado(posicion){
    this.certificados.splice(posicion,1);
    if(this.certificados.length == 0){
      this.mostrar = 1;
      localStorage.setItem('certificado',String(this.mostrar));
    }
  }

  editarCertificado(posicion){
    this.openCertificadoDialog();
  }

  agregarCertificados(){
    let body = JSON.parse(localStorage.getItem('bodyCliente'));
    this.certificados.forEach(element => {
      if(element.tipe == 'cer'){
        body.attach.certificadoB64 = element.fileBase64;
      }else{
        body.attach.clavePrivadaB64 = element.fileBase64;
      }
    });
    body.attach.password = this.certificados[0].password;
    body.attach.validoDesde = this.certificados[0].fechaInicio;
    body.attach.validoHasta = this.certificados[0].fechaFin;
    console.log("Body:",body);
    localStorage.setItem('bodyCliente', JSON.stringify(body));
    this.validarForm();
  }
}
