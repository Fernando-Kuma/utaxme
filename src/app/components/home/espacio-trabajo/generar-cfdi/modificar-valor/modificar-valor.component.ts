import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfiguracionAvanzada } from 'src/app/shared/model/espacio-trabajo.model';

@Component({
  selector: 'app-modificar-valor',
  templateUrl: './modificar-valor.component.html',
  styleUrls: ['./modificar-valor.component.css']
})
export class ModificarValorComponent {

  public form: FormGroup;
  valorActualizado: any;
  tiutlo: string;

  constructor(
    public dialogRef: MatDialogRef<ModificarValorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({      
      actualizarValor: [null, [Validators.required]],
    });
    this.form.get('actualizarValor').setValue(this.data.valor);
    this.tiutlo = this.data.titulo
  }

  closeDialog() {
    this.dialogRef.close(this.valorActualizado);
  }

  cancelarForm(){
    this.valorActualizado = this.data.valor
    this.closeDialog()
  }

  guardarForm(){
    if(this.form.controls['actualizarValor'].value == '' || this.form.controls['actualizarValor'].value == '.'){
      this.cancelarForm()
    }else{
      this.valorActualizado = this.form.controls['actualizarValor'].value
      this.closeDialog()
    }
  }

  public caracteresValidos(event) {
    let k = event.key;
    let reg = /^[0-9. ]+$/g;
    if(!reg.test(k)){
      return false
    }
  }

}
