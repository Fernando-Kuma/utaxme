import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/service/dialog.service';

@Component({
  selector: 'app-detalle-cumplimiento',
  templateUrl: './detalle-cumplimiento.component.html',
  styleUrls: ['./detalle-cumplimiento.component.css']
})
export class DetalleCumplimientoComponent implements OnInit {
  files: any[] = [];
  showForm: boolean = false;
  formCumplimiento: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DetalleCumplimientoComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private dialogService: DialogService) { }

  ngOnInit(): void {

    this.formCumplimiento = this.formBuilder.group({
      opinion: [null, [Validators.required]],
      creditos: [null, [Validators.required]],
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  confirmDialog() {
    this.dialogRef.close(true);
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
    console.log("Files Cargados:",this.files);
  }

  validarTermino(numero){
    if(numero == this.files.length){
      this.showForm = true;
    }else{
      this.showForm = false;
    }
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
    if(this.files.length == 0){
      this.showForm = false;
    }
  }

  getErrorRequerido(){
    return 'Este campo es requerido';
  }

  get formulario() {
    return this.formCumplimiento.controls;
  }

  

}
