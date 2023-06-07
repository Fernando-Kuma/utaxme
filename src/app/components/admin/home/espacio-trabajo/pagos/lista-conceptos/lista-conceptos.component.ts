import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Paginator } from 'array-paginator';
import { CrearConceptoComponent } from 'src/app/components/client/home/espacio-trabajo/generar-cfdi/crear-concepto/crear-concepto.component';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { Conceptos } from 'src/app/shared/model/espacio-trabajo.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DashboardService } from 'src/app/shared/service/dashboard.service';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { EspacioTrabajoService } from 'src/app/shared/service/espacio-trabajo.service';
import { ConfirmDialogComponent } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-lista-conceptos',
  templateUrl: './lista-conceptos.component.html',
  styleUrls: ['./lista-conceptos.component.css']
})
export class ListaConceptosComponent implements OnInit {

  tablaListaConceptos: any[] = [
    {
        "idConceptoCliente": 146,
        "idCliente": 435,
        "productoServicio": "QUINCENAS",
        "identificadorSat": "80101500",
        "descripcion": "SERVICIOS ADMINISTRATIVOS UTAX ME 2DA QUINCENA DICIEMBRE",
        "claveUnidad": "E48",
        "claveImpuestoSat": "002",
        "fechaRegistro": 1683779090000,
        "tasa": 16,
        "rfc": "OATP9611061C4",
        "unidad": "SERVICIO",
        "valorUnitario": 4536.81,
        "consecutivo": 1,
        "claveImpuestoLocal": null,
        "tasaLocal": null,
        "ivaRet": null,
        "isrRet": null,
        "ieps": null,
        "facturaPorDefault": false
    },
    {
        "idConceptoCliente": 148,
        "idCliente": 435,
        "productoServicio": "CONSULTORÍA",
        "identificadorSat": "80101500",
        "descripcion": "SERVICIO DE CONSULTORIA PROYECTO IMSS 4 SEPTIEMBRE",
        "claveUnidad": "E48",
        "claveImpuestoSat": "002",
        "fechaRegistro": 1664483220000,
        "tasa": 16,
        "rfc": "OATP9611061C4",
        "unidad": "SERVICIO",
        "valorUnitario": 80000,
        "consecutivo": 2,
        "claveImpuestoLocal": null,
        "tasaLocal": null,
        "ivaRet": null,
        "isrRet": null,
        "ieps": null,
        "facturaPorDefault": false
    },
    {
        "idConceptoCliente": 149,
        "idCliente": 435,
        "productoServicio": "CONSULTORÍA",
        "identificadorSat": "80101500",
        "descripcion": "SERVICIOS DE CONSULTORÍA DE NEGOCIOS Y ADMINISTRACIÓN CORPORATIVA",
        "claveUnidad": "E48",
        "claveImpuestoSat": "002",
        "fechaRegistro": 1601074702000,
        "tasa": 16,
        "rfc": "OATP9611061C4",
        "unidad": "SERVICIO",
        "valorUnitario": 86269.48,
        "consecutivo": 3,
        "claveImpuestoLocal": null,
        "tasaLocal": null,
        "ivaRet": null,
        "isrRet": null,
        "ieps": null,
        "facturaPorDefault": false
    },
    {
        "idConceptoCliente": 150,
        "idCliente": 435,
        "productoServicio": "CONSULTORÍA",
        "identificadorSat": "80101500",
        "descripcion": "CONSULTORÍA ESPECIALIZADA EN “ESTRATEGIA DIGITAL”, PARA EL DESARROLLO DE 15 PLANES DE MEJORA PYMES",
        "claveUnidad": "E48",
        "claveImpuestoSat": "002",
        "fechaRegistro": 1601076709000,
        "tasa": 16,
        "rfc": "OATP9611061C4",
        "unidad": "SERVICIO",
        "valorUnitario": 21614.31,
        "consecutivo": 4,
        "claveImpuestoLocal": null,
        "tasaLocal": null,
        "ivaRet": null,
        "isrRet": null,
        "ieps": null,
        "facturaPorDefault": false
    },
    {
        "idConceptoCliente": 165,
        "idCliente": 435,
        "productoServicio": "SERVICIOS EXTRAS",
        "identificadorSat": "82131603",
        "descripcion": "GRATIFICACION LESLEY MEJIA",
        "claveUnidad": "E48",
        "claveImpuestoSat": "002",
        "fechaRegistro": 1607643456000,
        "tasa": 16,
        "rfc": "OATP9611061C4",
        "unidad": "SERVICIO",
        "valorUnitario": 2586.21,
        "consecutivo": 5,
        "claveImpuestoLocal": null,
        "tasaLocal": null,
        "ivaRet": null,
        "isrRet": null,
        "ieps": null,
        "facturaPorDefault": false
    },
    {
        "idConceptoCliente": 166,
        "idCliente": 435,
        "productoServicio": "GRATIFICACION",
        "identificadorSat": "80161501",
        "descripcion": "SERVICIOS ADMINISTRATIVOS UTAX ME GRATIFICACION VACACIONAL",
        "claveUnidad": "E48",
        "claveImpuestoSat": "002",
        "fechaRegistro": 1683057823000,
        "tasa": 16,
        "rfc": "OATP9611061C4",
        "unidad": "SERVICIO",
        "valorUnitario": 2155.17,
        "consecutivo": 6,
        "claveImpuestoLocal": null,
        "tasaLocal": null,
        "ivaRet": null,
        "isrRet": null,
        "ieps": null,
        "facturaPorDefault": false
    },
  ] 
  tablaLista: Conceptos[]; 
  tituloProceso: string = 'ADMINISTRA tus conceptos'
  nombreCliente: string;
  public form: FormGroup;
  public pager:any;

  constructor(
    public dialog: MatDialog,  
    private dialogService: DialogService,
    private dialogServiceConfirm: ConfirmDialogService,
    public router: Router, 
    private auth: AuthService, 
    private formBuilder: FormBuilder,
    private espacioTrabajoService: EspacioTrabajoService
  ) { }

  ngOnInit(): void {
    this.nombreCliente = this.auth.administrador.nombreCompleto;
    this.crearForm()
    this.listaConceptos()
  }

  crearForm(){
    this.form = this.formBuilder.group({      
      buscar: [null],
    });
  }

  regresar(){
    this.router.navigateByUrl(NAV.homeAdmin + '/' + NAV.admnistracionPagos);
  }

  onPaged(page) {
    this.tablaLista = this.pager.page(page);
  }

  paginador(value: any){
    this.pager = new Paginator(value,6,1)
    if(value.length > 0){
      this.tablaLista = this.pager.page(1);  
    }else{
      this.tablaLista = []
    }
  }

  returnFilter(){
    if(this.tablaListaConceptos?.length > 0){
      this.form.reset();
      this.paginador(this.tablaListaConceptos);
    }else{
      this.regresar()
    }
  }

  listaConceptos(){
    //this.paginador(this.tablaListaConceptos);
    let request = {
      rfc: this.auth.adminClave.rfc
    }
    this.espacioTrabajoService.obtenerListaConceptos(request).subscribe((resp) => {
      console.log(resp)
      resp.listaConceptos.forEach(element => {
        element.descuento = 0
        element.importe = 0
      });
      this.tablaListaConceptos = resp.listaConceptos;
      this.paginador(resp.listaConceptos);
    },(_error) => {
      console.log("::Entro al error Datos fiscales: ", _error);
    });
  }

  onKeyDownEvent(event: any){
    let filtro = event.target.value;
    let busquedaTabla = this.tablaListaConceptos.filter( item =>
      item?.productoServicio?.toLowerCase().includes(filtro.toLowerCase()) || item?.descripcion?.toLowerCase().includes(filtro.toLowerCase())
    );
    this.paginador(busquedaTabla);

  }

  crearConcepto(){
    const dialogRef = this.dialog.open(
      CrearConceptoComponent, 
      this.dialogService.crearConcetoAdmin()
    );
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          const dialogRefConfirm = this.dialog.open( ConfirmDialogComponent, this.dialogServiceConfirm.nuevoConcepto() );
          dialogRefConfirm.afterClosed().subscribe( data => { this.listaConceptos() });
        }
      }
    );
  }

  editarConcepto(concepto: any){
    console.log(concepto)
    const dialogRef = this.dialog.open(
      CrearConceptoComponent, 
      this.dialogService.editarConceptoAdmin(concepto)
    );
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          const dialogRefConfirm = this.dialog.open( ConfirmDialogComponent, this.dialogServiceConfirm.editarConcepto() );
          dialogRefConfirm.afterClosed().subscribe( data => { this.listaConceptos() });
        }
      }
    );
  }

  borrarConcepto(concepto: any){
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent, 
      this.dialogServiceConfirm.eliminarConcepto()
    );
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          /* this.espacioTrabajoService.eliminarConcepto(concepto.idConceptoCliente)
            .subscribe((resp) => {
              console.log(resp)
              this.listaConceptos()
            },(_error) => {
              console.log("::Entro al error Datos fiscales: ", _error);
            }); */
        }
      }
    );
  }

}
