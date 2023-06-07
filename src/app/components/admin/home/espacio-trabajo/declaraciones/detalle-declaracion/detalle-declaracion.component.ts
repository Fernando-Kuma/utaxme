import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Moment } from 'moment';
import * as moment from 'moment';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL', 
  },
  display: {
    dateInput: 'YYYY - MM', // this is the format showing on the input element
    monthYearLabel: 'YYYY - MM', // this is showing on the calendar 
  },
};
@Component({
  selector: 'app-detalle-declaracion',
  templateUrl: './detalle-declaracion.component.html',
  styleUrls: ['./detalle-declaracion.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
  ],
})
export class DetalleDeclaracionComponent implements OnInit {
  files: any[] = [];
  showForm: boolean = false;
  formDeclaraciones: FormGroup;
  date = new FormControl(new Date());
  maxDate: Date;

  constructor(
    public dialogRef: MatDialogRef<DetalleDeclaracionComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formDeclaraciones = this.formBuilder.group({
      declaracion: [null, [Validators.required]],
      monto: [null, [Validators.required]],
      observaciones: [null, [Validators.required]],
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
    return this.formDeclaraciones.controls;
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    datepicker.close();
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedMonth.year());
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    //this.cambiarRequest()
  }

  public onlyNumbers(event) {
    let k;
    k = event.charCode;
    return (!(k > 31 && (k < 48 || k > 57)));
  }

  public keyShowAutocomplete(event: any) {
    if(event.target.value > 0 || event.target.value == ''){
    
    }else{
      if(Number(event.target.value) != 0){
        this.formDeclaraciones.get('observaciones')?.setErrors({ incorrectText: true });
      }
    }
  }

}
