import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarCertificadoComponent } from './agregar-certificado/agregar-certificado.component';
import * as moment from 'moment';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent implements OnInit {

  _tabs: number = -1;
  @Input() set tabs(val: number) {
    if(val >= 0){
      console.log("Cambiaste de TabCertificados")
      this.agregarCertificados();
    }
  }

  @Output()
  validForm : EventEmitter<boolean> = new EventEmitter<boolean>();

  mostrar:number = 1;
  certificados:any = null;
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
    let body = JSON.parse(localStorage.getItem('bodyCliente'));
    if(this.certificados.length == 0){
      this.mostrar = 1;
      localStorage.setItem('certificado',String(this.mostrar));
      body.attach.clavePrivadaB64 = '';
      body.attach.certificadoB64 = '';
      body.attach.password = '';
      body.attach.validoDesde = '';
      body.attach.validoHasta = '';
      body.attach.rfc='';
    }else{
      body.attach.clavePrivadaB64 = '';
      body.attach.certificadoB64 = '';
      body.attach.password = '';
      body.attach.validoDesde = '';
      body.attach.validoHasta = '';
      body.attach.rfc='';
      this.certificados?.forEach(element => {
        if(element.tipe == 'cer'){
          body.attach.certificadoB64 = element.fileBase64;
        }else{
          body.attach.clavePrivadaB64 = element.fileBase64;
        }
      });
      body.attach.password = this.certificados[0]?.password;
      let fechafin = this.certificados[0]?.fechaInicio.split('/');
      let fecFin = new Date((fechafin[1]+'/'+fechafin[0]+'/'+fechafin[2]));
      body.attach.validoDesde = moment(fecFin).format().substring(0,19);
      let fechaini = this.certificados[0]?.fechaFin.split('/');
      let fechainicio = new Date((fechaini[1]+'/'+fechaini[0]+'/'+fechaini[2]));
      body.attach.validoHasta = moment(fechainicio).format().substring(0,19);
    }
  }

  editarCertificado(posicion){
    this.openCertificadoDialog();
  }

  agregarCertificados(){
    let body = JSON.parse(localStorage.getItem('bodyCliente'));
    body.attach.rfc = body.rfc;
    if(this.certificados.length > 0){
      this.certificados?.forEach(element => {
        if(element.tipe == 'cer'){
          body.attach.certificadoB64 = element.fileBase64;
        }else{
          body.attach.clavePrivadaB64 = element.fileBase64;
        }
      });
      body.attach.password = this.certificados[0]?.password;
      let fechafin = this.certificados[0]?.fechaInicio.split('/');
      let fecFin = new Date((fechafin[1]+'/'+fechafin[0]+'/'+fechafin[2]));
      body.attach.validoDesde = moment(fecFin).format().substring(0,19);
      let fechaini = this.certificados[0]?.fechaFin.split('/');
      let fechainicio = new Date((fechaini[1]+'/'+fechaini[0]+'/'+fechaini[2]));
      body.attach.validoHasta = moment(fechainicio).format().substring(0,19);
    }else{
      body.attach.clavePrivadaB64 = '';
      body.attach.certificadoB64 = '';
      body.attach.password = '';
      body.attach.validoDesde = '';
      body.attach.validoHasta = '';
      body.attach.rfc='';
    }
    console.log("Body:",body);
    localStorage.setItem('bodyCliente', JSON.stringify(body));
  }

  guardarCertificados(){
    this.agregarCertificados();
    this.validarForm();
  }
}
