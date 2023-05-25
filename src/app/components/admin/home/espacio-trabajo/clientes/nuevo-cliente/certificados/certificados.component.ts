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

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCertificadoDialog() {
    this.dialog.open(
      AgregarCertificadoComponent,{
        width: '750px ',
        height: '850px ',
        disableClose: true
      }
    );
  }

  validarForm(){
    this.validForm.emit(true);
  }
}
