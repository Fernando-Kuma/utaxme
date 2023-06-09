import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModificarValorComponent } from 'src/app/components/client/home/espacio-trabajo/generar-cfdi/modificar-valor/modificar-valor.component';
import { Conceptos, TotalFactura } from 'src/app/shared/model/espacio-trabajo.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { ConceptosComponent } from '../conceptos/conceptos.component';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { ClienteService } from 'src/app/shared/service/cliente.service';

@Component({
  selector: 'app-detalle-pago',
  templateUrl: './detalle-pago.component.html',
  styleUrls: ['./detalle-pago.component.css']
})
export class DetallePagoComponent implements OnInit {

  razonSocial: string;
  clienteRFC: string;

  tablaListaConceptos: any = [] /* = [
    {
        "idConceptoCliente": 1134,
        "idCliente": 435,
        "productoServicio": "ARRENDAMIENTO COMPLEJO",
        "identificadorSat": "25172601",
        "descripcion": "ACABADOS PARA AUTOMOTORES",
        "claveUnidad": "H87",
        "claveImpuestoSat": "002",
        "fechaRegistro": 1683058223000,
        "tasa": 16,
        "rfc": "OATP9611061C4",
        "unidad": "PIEZA",
        "valorUnitario": 32000,
        "consecutivo": 11,
        "claveImpuestoLocal": null,
        "tasaLocal": null,
        "ivaRet": 10.6667,
        "isrRet": 10,
        "ieps": null,
        "cantidad": 0,
        "descuento": 0,
        "importe": 0,
        "estatus": true
    },
    {
        "idConceptoCliente": 1135,
        "idCliente": 435,
        "productoServicio": "ARRENDAMIENTO COSMOS",
        "identificadorSat": "45121609",
        "descripcion": "ABRAZADERAS PARA CÁMARAS",
        "claveUnidad": "H87",
        "claveImpuestoSat": "002",
        "fechaRegistro": 1683058293000,
        "tasa": 16,
        "rfc": "OATP9611061C4",
        "unidad": "PIEZA",
        "valorUnitario": 32000,
        "consecutivo": 12,
        "claveImpuestoLocal": null,
        "tasaLocal": null,
        "ivaRet": 10.6667,
        "isrRet": 10,
        "ieps": null,
        "cantidad": 0,
        "descuento": 0,
        "importe": 0,
        "estatus": true
    },
    {
        "idConceptoCliente": 1136,
        "idCliente": 435,
        "productoServicio": "ARRENDAMIENTO CUBRES",
        "identificadorSat": "83112600",
        "descripcion": "ACCESO DE CLIENTES",
        "claveUnidad": "E48",
        "claveImpuestoSat": "002",
        "fechaRegistro": 1683058355000,
        "tasa": 16,
        "rfc": "OATP9611061C4",
        "unidad": "SERVICIO",
        "valorUnitario": 50000,
        "consecutivo": 13,
        "claveImpuestoLocal": null,
        "tasaLocal": null,
        "ivaRet": 10.6667,
        "isrRet": 10,
        "ieps": null,
        "cantidad": 0,
        "descuento": 0,
        "importe": 0,
        "estatus": true
    },
    {
        "idConceptoCliente": 1137,
        "idCliente": 435,
        "productoServicio": "PRUEBA",
        "identificadorSat": "45121609",
        "descripcion": "ABRAZADERAS PARA CÁMARAS",
        "claveUnidad": "H87",
        "claveImpuestoSat": "002",
        "fechaRegistro": 1683846592000,
        "tasa": 10,
        "rfc": "OATP9611061C4",
        "unidad": "PIEZA",
        "valorUnitario": 20,
        "consecutivo": 14,
        "claveImpuestoLocal": "ISH",
        "tasaLocal": 5,
        "ivaRet": null,
        "isrRet": null,
        "ieps": 0,
        "cantidad": 0,
        "descuento": 0,
        "importe": 0,
        "estatus": true
    }
] */
  public form: FormGroup;
  costoFactura: TotalFactura = new  TotalFactura;

  fecha: any = new Date();
  mes: any;
  conceptosDefault: any = [];


  constructor(
    public dialogRef: MatDialogRef<DetallePagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public router: Router,
    private dialogService: DialogService,
    public dialog: MatDialog,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    let fechaCorta = this.fecha.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })
    this.mes = fechaCorta.toUpperCase()
    this.razonSocial = this.data.usuarioCliente.razonSocial
    this.clienteRFC = this.data.usuarioCliente.rfc

    this.obtenerConceptos()
  
  }

  crearForm(){
    this.form = this.formBuilder.group({      
      busqueda: ['']
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  confirmDialog() {
    this.guardarConceptos()
  }

  guardarConceptos(){
    this.tablaListaConceptos.forEach(element => {
      this.clienteService.actualizarConcepto(element)
      .subscribe((response) => {
        console.log(response)
        this.dialogRef.close(true);
      },(_error) => {
        console.log("Error en obtener clientes: ", _error);
      });
    });
  }

  generarCFDI(){
    this.router.navigateByUrl(NAV.homeAdmin +'/'+ NAV.generarCfdi)
    this.dialogRef.close(false);
  }

  obtenerConceptos(){
    let _request = {
      rfc: this.data.usuarioCliente.rfc,
      facturaPorDefault: true

    }
    this.clienteService.obtenerConceptosCliente(_request)
    .subscribe((response) => {
      if(response.listaConceptos != null){
        response.listaConceptos.forEach(element => {
          if(element.cantidad > 0){
            element.importe = Number((element.cantidad * element.valorUnitario).toFixed(2))
            element.importe = Number((element.importe - element.descuento).toFixed(2))
          }
        });
        this.tablaListaConceptos = response.listaConceptos.filter( item => item.facturaPorDefault)
        this.conceptosDefault = response.listaConceptos.filter( item => item.facturaPorDefault)
        this.calcularTotal()
      }
    },(_error) => {
      console.log("Error en obtener clientes: ", _error);
    });
  }

  listaConcepto(){
    const dialogRef = this.dialog.open(
      ConceptosComponent, 
      this.dialogService.tablaConceptosAdministrador(this.tablaListaConceptos, this.data.usuarioCliente)
    );
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          data.forEach(item => {
            item.facturaPorDefault = true
            this.tablaListaConceptos.push(item)
          });
        }
      }
    );
  }

  actualizarValor(columna: string, item: Conceptos){
    let titulo 
    let valor
    if(columna === 'cantidad'){
      titulo = "Actualiza cantidad"
      valor = item.cantidad
    }else{
      titulo ="Actualiza descuento"
      valor = item.descuento
    }
    const dialogRef = this.dialog.open(
      ModificarValorComponent, 
      this.dialogService.actualizarValor(titulo, valor)
    );
    dialogRef.afterClosed().subscribe(
      data => {
        if(columna === 'cantidad'){
          item.cantidad = Number(data)
        }else{
          item.descuento = Number(data)
        }
        item.importe = Number((item.cantidad * item.valorUnitario).toFixed(2))
        item.importe = Number((item.importe - item.descuento).toFixed(2))
        this.calcularTotal()
      }
    )
  }

  eliminarConcepto(concepto: any){
    let index = this.tablaListaConceptos.findIndex(element => element.idConceptoCliente == concepto)
    if(this.conceptosDefault[index] != null){
      this.tablaListaConceptos[index].facturaPorDefault = false
    }else{
      this.tablaListaConceptos.splice(index, 1)
    }
    this.calcularTotal()
  }

  calcularTotal(){
    this.costoFactura = new  TotalFactura;
    this.tablaListaConceptos.forEach(element => {
      if(element.cantidad && element.facturaPorDefault){
        let valorTotal =  element.valorUnitario * element.cantidad
        this.costoFactura.ivaT = Number((((valorTotal - element.descuento) * (element.tasa/100)) + this.costoFactura.ivaT).toFixed(2))
        this.costoFactura.ieps = Number(((valorTotal * (element.ieps/100)) + this.costoFactura.ieps).toFixed(2))
        /* this.costoFactura.isrR = Number(((valorTotal * (element.isrRet/100)) + this.costoFactura.isrR).toFixed(2))
        this.costoFactura.ivaR = Number(((valorTotal * (element.ivaRet/100)) + this.costoFactura.ivaR).toFixed(2))
        this.costoFactura.localTraslado = Number(((valorTotal * (element.tasaLocal/100)) + this.costoFactura.localTraslado).toFixed(2))
         */
        this.costoFactura.descuento = Number(element.descuento)+ this.costoFactura.descuento
        this.costoFactura.subtotalSinDescuento = element.descuento ?
        this.costoFactura.subtotalSinDescuento + valorTotal : this.costoFactura.subtotalSinDescuento
        
        this.costoFactura.subtotal = Number((element.importe + this.costoFactura.subtotal).toFixed(4))
        
        this.costoFactura.total = 
        Number((this.costoFactura.subtotal + this.costoFactura.ivaT + this.costoFactura.ieps).toFixed(2))
      }
    });
  }

}
