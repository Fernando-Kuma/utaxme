import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { ConfirmarCancelarDialogComponent } from '../confirmar-cancelar-dialog/confirmar-cancelar-dialog.component';
import { EspacioTrabajoService } from 'src/app/shared/service/espacio-trabajo.service';
import * as moment from 'moment';
import { ListaCfdi } from 'src/app/shared/model/espacio-trabajo.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-cancelar-dialog',
  templateUrl: './cancelar-dialog.component.html',
  styleUrls: ['./cancelar-dialog.component.css']
})
export class CancelarDialogComponent implements OnInit {

  nOrdenNuevoList: any = [
    {
      clave: "01",
      descripcion: "220911",
    },
    {
      clave: "25",
      descripcion: "221121",
    },
    {
      clave: "48",
      descripcion: "221005",
    },
    {
      clave: "10",
      descripcion: "230113",
    },
  ];

 

  catalogo: any;
  disabled: boolean = true;
  public form: FormGroup;
  tablaListaCfdi: ListaCfdi[];
  mostrarListCfdi: boolean = false;
  motivo: any;
  selectedMotivo: string;
  motivoSeleccionado: string;
  nuevaOrdenSeleccionado : string;
  selectedNewOrder: string;
  

  constructor(
    public dialogRef: MatDialogRef<CancelarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private espacioTrabajoService: EspacioTrabajoService,
    private dialogService: DialogService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    console.log('::CFDI item',this.data.cfdi.referencia);
    this.crearForm();
    this.obtenerCatalogos();
    
  }

  actionMostrarSelect() {
    this.motivoSeleccionado = this.selectedMotivo;
    if(this.form.controls['motivoCancelacion'].value == 'Comprobante emitido con errores con relacion')
      {
      this.mostrarListCfdi = true;
      this.listaFecha();
    }else{
      this.mostrarListCfdi = false;
    }
  }

  actionNuevaOrden() {
    this.nuevaOrdenSeleccionado = this.selectedNewOrder;
    if(this.form.controls['motivoCancelacion'].value == 'Comprobante emitido con errores con relacion')
      {
      this.mostrarListCfdi = true;
    }else{
      this.mostrarListCfdi = false;
    }
  }
  
  crearForm(){
    this.form = this.formBuilder.group({     
      nOrden: [{ value: this.data.cfdi.referencia, disabled: this.disabled }], 
      motivoCancelacion: [null, []],
      nOrdenNuevo: [null, []],
    });
  }

  obtenerCatalogos(){
    this.espacioTrabajoService.obtenerCatalogoForm()
      .subscribe((response) => {
      this.catalogo = response.catalogoMotivoCancelacion;
    },(_error) => {
      console.log("Error en catalogo: ", _error);
    }
    );
  }

  listaFecha() {
    let req = {
      rfc: this.auth.usuario.cliente.rfc,
      fechaInicialFilter: moment(this.data.cfdi.fechaTimbrado ).format(
        'YYYY-MM-DD'
      ),
      fechaFinFilter: moment().format('YYYY-MM-DD'),
    };
    this.espacioTrabajoService.busquedaCfdiFecha(req).subscribe(
      (resp) => {
      this.tablaListaCfdi = resp.lista;
      console.log('::LISTA', this.tablaListaCfdi);



    /*   let datos = [{
        "id": "1322",
        "descripcion": "Valido",
        "valores": [{
          "descripcion": "Agrego con Validacion",
          "var": "55"
        }]
      },
      {
        "id": "2555",
        "descripcion": "Estado",
        "valores": [{
            "descripcion": "proceso",
            "valor": "P"
          },
          {
            "descripcion": "Otro",
            "valor": "O"
          },
          {
            "descripcion": "Ausente",
            "valor": "A"
          }
        ]
      }
    ]
    
    let listaDeValores = this.tablaListaCfdi.reduce((a, b) => a = a.concat(b.lista), [])
    
    console.log(listaDeValores) */
      },
      (_error) => {
        console.log('::Entro al error', _error);
      }
    );
  }

  confirmarCancelacionDialog(item){
     let motivo = this.form.controls['motivoCancelacion'].value;
    /* console.log('::PASO DE Motivo', this.form.controls['motivoCancelacion'].value); */
    const dialogRef = this.dialog.open(
      ConfirmarCancelarDialogComponent, 
      this.dialogService.confirmarCancelarCfdi(item, motivo)
    );
    dialogRef.afterClosed().subscribe(
      data => {
        if(data == true){
          this.closeDialog();
        }
        console.log("::DATA", data);
      }
    );
  }


  closeDialog() {
    this.dialogRef.close(false);
  }



  
}
