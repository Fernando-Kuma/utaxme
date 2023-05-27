import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, ReplaySubject } from 'rxjs';
import { AlertService } from 'src/app/shared/utils/alertas';
import * as moment from 'moment';

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
  fileLocalStorage = [];
  constructor(private formBuilder: FormBuilder,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AgregarCertificadoComponent>) { }

  ngOnInit(): void {
    this.crearForm();
  }

  crearForm(){
    this.formCertificado = this.formBuilder.group({
      inicial: [null, [Validators.required]],
      final: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files.files);
  }

  prepareFilesList(files: Array<any>) {
    console.log("Archivos:",files);
    for (const item of files) {
      let texto = item.name.split('.');
      console.log("Textos:",texto);
      if(texto[(texto.length - 1)] == 'cer' || texto[(texto.length - 1)] == 'key'){
        item.progress = 0;
        this.files.push(item);
      }else{
        console.log("No se puede agregar un archivo diferente a cer o key");
        this.alertService.warn('<b>Solo puede agregar archivos de tipo (.cer o .key).</b>');
      }
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
    console.log("Files Cargados:",this.files);
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
    if(numero == this.files.length){
      this.showForm = true;
    }else{
      this.showForm = false;
    }
  }

  close(){
    this.dialogRef.close({pantalla:1,file:[]});
  }

  subirArchivos(){
    this.onFileSelected();
    this.dialogRef.close({pantalla:2,file:this.fileLocalStorage});
  }

  get formulario() {
    return this.formCertificado.controls;
  }


  onFileSelected() {
    this.files.forEach(element => {
      this.convertFile(element).subscribe(base64 => {
        this.fileLocalStorage.push({name:element.name,fileBase64: base64,fechaInicio: moment(this.formCertificado.get('inicial').value).format('DD/MM/YYYY'),fechaFin: moment(this.formCertificado.get('final').value).format('DD/MM/YYYY'),password:this.formCertificado.get('password').value});
      });
    });
    console.log('FilesBase64:',this.fileLocalStorage);
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }
}
