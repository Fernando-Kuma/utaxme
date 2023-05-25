import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-certificado',
  templateUrl: './agregar-certificado.component.html',
  styleUrls: ['./agregar-certificado.component.css']
})
export class AgregarCertificadoComponent implements OnInit {

  files: any[] = [];
  fecha = new Date();
  fechaActual = new Date(
    this.fecha.getFullYear(),
    this.fecha.getMonth(),
    this.fecha.getDate()
  );
  fecInicio = new Date();
  fecFin = new Date();
  public formCertificado: FormGroup;
  validDateError: boolean;
  showForm: boolean = false;
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarCertificadoComponent>) { }

  ngOnInit(): void {
    this.formCertificado = this.formBuilder.group({
      inicial: ['', [Validators.required]],
      final: ['', [Validators.required]],
    });
  }

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files.files);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 10;
          }
        }, 200);
      }
    }, 1000);
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  requiredTrue() {
    this.formCertificado.get('inicial').setValidators([Validators.required]);
    this.formCertificado.get('final').setValidators([Validators.required]);
    this.formCertificado.get('inicial').updateValueAndValidity();
    this.formCertificado.get('final').updateValueAndValidity();
  }

  validDate() {
    this.fecFin = new Date(this.formCertificado.get('final').value);
    let fechaFin = String(
      this.fecFin.getMonth() +
        1 +
        '/' +
        this.fecFin.getDate() +
        '/' +
        this.fecFin.getFullYear()
    );
    this.fecFin = new Date(fechaFin);
    this.fecInicio = new Date(this.formCertificado.get('inicial').value);
    let fechaInicio = String(
      this.fecInicio.getMonth() +
        1 +
        '/' +
        this.fecInicio.getDate() +
        '/' +
        this.fecInicio.getFullYear()
    );
    this.fecInicio = new Date(fechaInicio);
    if (this.fecInicio > this.fecFin) {
      this.validDateError = true;
    } else {
      this.validDateError = false;
    }
  }

  validarTermino(numero){
    console.log("Numero:",numero);
    if(numero == this.files.length){
      this.showForm = true;
    }else{
      this.showForm = false;
    }
  }

  close(){
    this.dialogRef.close();
  }
}
