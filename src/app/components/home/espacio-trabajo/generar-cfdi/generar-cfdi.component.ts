import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NAV } from 'src/app/shared/configuration/navegacion';
import { DatosFiscales } from 'src/app/shared/model/dashboard.mode';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DashboardService } from 'src/app/shared/service/dashboard.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfiguracionAvanzadaComponent } from './configuracion-avanzada/configuracion-avanzada.component';
import { ConceptosComponent } from './conceptos/conceptos.component';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { EspacioTrabajoService } from 'src/app/shared/service/espacio-trabajo.service';
import { Conceptos, ConfiguracionAvanzada, TotalFactura } from 'src/app/shared/model/espacio-trabajo.model';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.service';
import { ModificarValorComponent } from './modificar-valor/modificar-valor.component';
import { NuevoClienteComponent } from '../clientes-frecuentes/nuevo-cliente/nuevo-cliente.component';
import { AlertService } from 'src/app/shared/utils/alertas';



@Component({
  selector: 'app-generar-cfdi',
  templateUrl: './generar-cfdi.component.html',
  styleUrls: ['./generar-cfdi.component.css']
})
export class GenerarCfdiComponent implements OnInit {

  public form: FormGroup;
  requestDashboard: any;
  tituloProceso: string = 'Crear nueva factura'
  nombreCliente: string;
  filteredOptions: Observable<any[]>;
  cacheFormulario: any;
  
  formularioAvanzado: ConfiguracionAvanzada = new ConfiguracionAvanzada
  regimenFiscal: any;
  catalogos: any;
  listaClientes: any;
  datosFiscales: DatosFiscales;
  tablaListaConceptos: Conceptos[] = []; 

  idTipoFactura: string;
  totalConceptos: any; 
  tipoFactura: any;
  subTotal: number;
  descuentoTotal: number;
  totalCFDI: number;

  checkPlataformas: boolean = true;

  costoFactura: TotalFactura = new  TotalFactura;

  constructor(
    private alertService: AlertService,
    public dialog: MatDialog,  
    private dialogService: DialogService,
    private confirmDialogService: ConfirmDialogService,
    public router: Router, 
    private auth: AuthService, 
    private formBuilder: FormBuilder, 
    private dashboardService: DashboardService,
    private espacioTrabajoService: EspacioTrabajoService) {
      }

  ngOnInit(): void {

    this.nombreCliente = this.auth.usuario.nombre;
    this.requestDashboard = {
      rfc: this.auth.usuario.cliente.rfc
    }

    this.crearForm()
    this.obtenerDatosFiscales()
    this.obtenerCatalogos()
    this.obtenerRegimenFiscal()
    this.obtenerListaClientesFrecuentes()
    this.setTipoFactura("UTAXME", "UTAXME");
    
  }

  crearForm(){
    this.form = this.formBuilder.group({      
      numeroOrden: ['', [Validators.required, Validators.minLength(3)]],
      regimenFiscal: ['', [Validators.required]],
      usoCFDI: ['', [Validators.required]],
      formaPago: ['', [Validators.required]],
      
      rfc: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(13), Validators.pattern("^[A-Za-z0-9]+$")]],
      razonSocial: ['', [Validators.required, Validators.minLength(3)]],
      regimenFiscalCliente: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.pattern(".+@.+\..+")]],
      ///^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    });
  }

  selecionarCliente(cliente: any){
    this.form.get('razonSocial').setValue(cliente.razonSocial);
    this.form.get('regimenFiscalCliente').setValue(cliente.regimenFiscal);
    this.form.get('codigoPostal').setValue(cliente.codigoPostal);
    this.form.get('correo').setValue(cliente.correoElectronico);
  }

  regresar(){
    console.log(localStorage.getItem('back-return'))
    if(localStorage.getItem('back-return') != null){
      localStorage.removeItem('back-return');
      this.router.navigateByUrl(NAV.dashboard);
    }else{
      this.router.navigateByUrl(NAV.espacioTrabajo);
    }

  }

  cancelarCFDI(){
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).enable();
      this.form.get(key).setValue('');
    });
    this.tablaListaConceptos = []
  }

  obtenerDatosFiscales(): void {
    this.dashboardService.obtenerDatosFiscales(this.requestDashboard).subscribe((resp) => {
      this.datosFiscales = resp.datosFiscales;
    },(_error) => {
      console.log("::Entro al error Datos fiscales: ", _error);
    }
    );
  }

  obtenerCatalogos(){
    this.espacioTrabajoService.obtenerCatalogoForm()
      .subscribe((response) => {
      this.catalogos = response;
    },(_error) => {
      console.log("Error en catalogo: ", _error);
    }
    );
  }

  obtenerRegimenFiscal(){
    this.espacioTrabajoService.obtenerRegimenFiscal(this.requestDashboard)
    .subscribe((response) => {
      this.regimenFiscal =  response.lista
    },(_error) => {
      console.log("::Entro al error Datos fiscales: ", _error);
    }
    );
  }

  obtenerListaClientesFrecuentes(){
    this.espacioTrabajoService.obtenerListaFrecuentes(this.requestDashboard)
    .subscribe((response) => {
      this.listaClientes =  response.clientes
      this.filteredOptions = this.form.controls['rfc'].valueChanges.pipe(
        startWith(''),
        map(value => value ? this._filter(value) : this.listaClientes.slice()),
      );
    },(_error) => {
      console.log("::Entro al error Datos fiscales: ", _error);
    }
    );
  }
  
  listaConcepto(){
    if(this.form.valid){
      const dialogRef = this.dialog.open(
        ConceptosComponent, 
        this.dialogService.tablaConceptos(this.tablaListaConceptos)
      );
      dialogRef.afterClosed().subscribe(
        data => {
          if(data){
            this.tablaListaConceptos = data;
          }
        }
      );
    }
    if(this.form.invalid){
      Object.keys(this.form.controls).forEach((field) => {
          const control = this.form.get(field);
          if (!control.valid) {
              control.markAsTouched({ onlySelf: true });
          }
      });

      this.alertService.warn("<b>Debes de rellenar todos los campos</b>")
    }
  }

  eliminarConcepto(concepto: any){
    let index = this.tablaListaConceptos.findIndex(element => element.idConceptoCliente == concepto)
    this.tablaListaConceptos.splice(index, 1)
    this.calcularTotal()
  }

  configuracionAvanzada(){
    const dialogRef = this.dialog.open(
      ConfiguracionAvanzadaComponent, 
      this.dialogService.configuracionAvanzada(this.catalogos, this.formularioAvanzado)
    );
    dialogRef.afterClosed().subscribe(
      data => {
        console.log(data)
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
 
  calcularTotal(){
    this.costoFactura = new  TotalFactura;
    this.tablaListaConceptos.forEach(element => {
      if(element.cantidad){
        let valorTotal =  element.valorUnitario * element.cantidad
        this.costoFactura.ivaT = Number((((valorTotal - element.descuento) * (element.tasa/100)) + this.costoFactura.ivaT).toFixed(2))
        this.costoFactura.isrR = Number(((valorTotal * (element.isrRet/100)) + this.costoFactura.isrR).toFixed(2))
        this.costoFactura.ivaR = Number(((valorTotal * (element.ivaRet/100)) + this.costoFactura.ivaR).toFixed(2))

        this.costoFactura.ieps = Number(((valorTotal * (element.ieps/100)) + this.costoFactura.ieps).toFixed(2))
        
        this.costoFactura.localTraslado = Number(((valorTotal * (element.tasaLocal/100)) + this.costoFactura.localTraslado).toFixed(2))
        this.costoFactura.descuento = Number(element.descuento)+ this.costoFactura.descuento
        this.costoFactura.subtotalSinDescuento = element.descuento ?
        this.costoFactura.subtotalSinDescuento + valorTotal : this.costoFactura.subtotalSinDescuento
        this.costoFactura.subtotal = Number((element.importe + this.costoFactura.subtotal).toFixed(4))
        this.costoFactura.total = 
        Number((this.costoFactura.subtotal + this.costoFactura.ivaT + this.costoFactura.ieps - this.costoFactura.isrR - this.costoFactura.ivaR).toFixed(2))
      }
    });
  }

  crearCliente(){
    const dialogRef = this.dialog.open(
      NuevoClienteComponent, 
      this.dialogService.crearCliente()
    );
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.dialog.open( ConfirmDialogComponent, this.confirmDialogService.nuevoCliente() );
          this.obtenerListaClientesFrecuentes();
        }
      }
    );
  }

  confirmarGenerarCFDI() {
    let validacion = true;
    if(this.tablaListaConceptos.length <= 0){
      this.alertService.warn("<b>Agregue al menos un concepto para generar una factura</b>")
      validacion = false
    }
    if(this.form.invalid){
      Object.keys(this.form.controls).forEach((field) => {
          const control = this.form.get(field);
          if (!control.valid) {
              control.markAsTouched({ onlySelf: true });
          }
      });
      validacion = false
    }
    let tasaLocal = this.tablaListaConceptos[0].tasaLocal;
    this.tablaListaConceptos.forEach(element => {
      if(element.importe <= 0){
        this.alertService.error("<b>No se permite facturar importes en cero o negativos, por favor rectifique</b>")
        validacion = false
      }
      if (element.tasaLocal != tasaLocal) {
        this.alertService.error("<b>En el CFDI no pueden haber más de 1 concepto con el impuesto local con diferentes tasas</b>")
        validacion = false
      }
      if(this.tipoFactura == "AIRBNB"){
        if (element.tasa == null) {
          this.alertService.error("<b>Para la plataforma de AIRBNB, no se permite generar un CFDI sin IVA trasladado.</b>")
          validacion = false
        }
        if (element.tasa == 0) {
          this.alertService.error("<b>Para la plataforma de AIRBNB, no se permite generar un CFDI con IVA tasa 0%.</b>")
          validacion = false
        }
        if (element.ieps != null) {
          this.alertService.error("<b>Para la pataforma de ARIBNB, no se permite agregar el impuesto IEPS.</b>")
          validacion = false
        }
      }
    });
    if(this.totalConceptos == 0.0){
      this.alertService.warn("<b>El monto de la factura debe ser mayor a cero</b>")
      validacion = false
    }
    if(validacion ){
      this.dialogCFDI();
    }
  }
  
  dialogCFDI(){
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent, 
      this.confirmDialogService.generarCFDI()
    );
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.generarServicioCFDI()
        }
      }
    );

  }

  generarServicioCFDI() {
    let _emisor = {
      regimenFiscal: this.datosFiscales.idSat,
      razonSocial: this.datosFiscales.razonSocial, // Es del cliente o el usuario
      rfc: this.datosFiscales.rfc,
    };
    let _receptor = {
      razonSocial: this.form.controls['razonSocial'].value,
      rfc: this.form.controls['rfc'].value,
      cp: this.form.controls['codigoPostal'].value,
      emailPrincipal: this.form.controls['correo'].value,
      regimenFiscal: this.form.controls['regimenFiscalCliente'].value,
      usoCfdi: this.form.controls['usoCFDI'].value
    };
    let _informacionGlobal = null
    if(this.formularioAvanzado.configuracionGeneral){
      _informacionGlobal = {
        periodicidad: this.formularioAvanzado.periodicidad,
        meses: this.formularioAvanzado.meses,
        anio: this.formularioAvanzado.anio
      }
    };

    let _conceptos = [];
    this.tablaListaConceptos.forEach(element => {
      let _subtotal = Number((element.cantidad * element.valorUnitario - element.descuento).toFixed(2));
      _conceptos.push({
        nombreProductoServicio: element.productoServicio,
        numeroIdentificacion: element.identificadorSat,
        descripcion: element.descripcion,
        claveUnidad: element.claveUnidad.trim().toUpperCase(),
        precioUnitario: element.valorUnitario.toFixed(2),
        cantidad: element.cantidad.toFixed(0),
        subTotal: Number(_subtotal + element.descuento).toFixed(2),
        descuento: element.descuento.toFixed(2),
        taxObject: element.taxObject,

        impuestos: [
          {
            nombreImpuesto: "IVA",
            tasa: element.tasa == null ? "remove" : element.tasa.toFixed(2),
            base: _subtotal,
            total: ((_subtotal * element.tasa)/100).toFixed(2),
            isRetencion: "false",
          },
          {
            nombreImpuesto: "IEPS",
            tasa: element.ieps == null ? "remove" : element.ieps.toFixed(2),
            base: _subtotal,
            total: ((_subtotal * element.ieps)/100).toFixed(2),
            isRetencion: "false",
          },

          {
            nombreImpuesto: "ISR",
            tasa: element.isrRet == null ? "remove" : element.isrRet.toFixed(2),
            base: _subtotal,
            total: ((_subtotal * element.isrRet)/100).toFixed(2),
            isRetencion: "true",
          },
          {
            nombreImpuesto: "IVA",
            tasa: element.ivaRet == null ? "remove" : element.ivaRet.toFixed(2),
            base: _subtotal,
            total: ((_subtotal * element.ivaRet)/100).toFixed(2),
            isRetencion: "true",
          },
          {
            nombreImpuesto: "ISH",
            tasa: element.tasaLocal == null ? "remove" : element.tasaLocal.toFixed(2),
            base: _subtotal,
            total: ((_subtotal * element.tasaLocal)/100).toFixed(2),
            isRetencion: "false",
          },
        ],
        
      });
    });

    _conceptos.forEach(element => {
      let _impuestosAux = element.impuestos.filter((obj) => {
        return obj.tasa != "remove";
      });
      element.impuestos = _impuestosAux;
      element.impuestos.length === 0 ?  element.taxObject = "01": element.taxObject = "02";
    });
      
      //Emitir CFDI 4.0
    let requestDashboard = {
      usoCfdi: this.form.controls['usoCFDI'].value,
      tipoCfdi: this.checkPlataformas ? "I" : 
        this.tipoFactura == "Ingreso" ? "I" : this.tipoFactura == "Ingreso" ? "I" : this.tipoFactura, 
      lugarExpedicion: this.datosFiscales.cp,
      formaPago: this.form.controls['formaPago'].value,
      metodoPago:this.formularioAvanzado.metodoPago,
      moneda: this.formularioAvanzado.moneda,
      condicionesPago: this.formularioAvanzado.condiciones,
      plataformaTecnologica: !this.checkPlataformas ? "UTAXME" : this.idTipoFactura, //new
      observaciones: "",
      bancoPago: "",
      cuentaBancaria: "0000",
      numeroOrden: this.form.controls['numeroOrden'].value,

      subTotal: String(this.costoFactura.subtotal),
      total: String(this.costoFactura.total),
      emisor: _emisor,
      receptor: _receptor,
      informacionGlobal: _informacionGlobal,
      conceptos: _conceptos
    }

    this.espacioTrabajoService.emitirCFDI(requestDashboard)
      .subscribe((response) => {
        this.alertService.error('<b>Se genero tu CFDI.</b>');
      },(_error) => {
        this.alertService.error('<b>Hubo un error al generar tu CFDI, inténtelo de nuevo.</b>');
        console.log("Error en emitit el cfdi: ", _error);
      });
  }

  publicoGeneral(value: boolean){
    if(value){
      this.guardarCacheForm()
      this.form.controls['usoCFDI'].disable();
      this.form.controls['rfc'].disable();
      this.form.controls['razonSocial'].disable();
      this.form.controls['regimenFiscalCliente'].disable();
      this.form.controls['codigoPostal'].disable();
      this.form.controls['usoCFDI'].setValue('S01');
      this.form.controls['formaPago'].setValue('03');
      this.form.controls['rfc'].setValue('XAXX010101000');
      this.form.controls['razonSocial'].setValue('PUBLICO EN GENERAL');
      this.form.controls['regimenFiscalCliente'].setValue('616');
      this.form.controls['codigoPostal'].setValue(Number(this.datosFiscales.cp));
      this.form.controls['correo'].setValue(this.datosFiscales.emailPrincipal);
    }else{
      console.log(this.cacheFormulario)
      this.form.controls['usoCFDI'].enable();
      this.form.controls['rfc'].enable();
      this.form.controls['razonSocial'].enable();
      this.form.controls['regimenFiscalCliente'].enable();
      this.form.controls['codigoPostal'].enable();
      this.form.controls['usoCFDI'].setValue(this.cacheFormulario.usoCFDI);
      this.form.controls['formaPago'].setValue(this.cacheFormulario.formaPago);
      this.form.controls['rfc'].setValue(this.cacheFormulario.rfc);
      this.form.controls['razonSocial'].setValue(this.cacheFormulario.razonSocial);
      this.form.controls['regimenFiscalCliente'].setValue(this.cacheFormulario.regimenFiscalCliente);
      this.form.controls['codigoPostal'].setValue(this.cacheFormulario.codigoPostal);
      this.form.controls['correo'].setValue(this.cacheFormulario.correo);
    }

    this.configuracionAvanzada()
  }

  setTipoFactura(_IdTipoFactura, _tipoFactura) {
    if (_IdTipoFactura == null) {
      this.tipoFactura = _tipoFactura.descripcion;
      this.idTipoFactura = _tipoFactura.descripcion;
      this.checkPlataformas = false;
    } else {
      this.idTipoFactura = _IdTipoFactura;
      this.tipoFactura = _tipoFactura;
    }
  }
  
  guardarCacheForm(){
    this.cacheFormulario = {
      usoCFDI: this.form.controls['usoCFDI'].value,
      formaPago: this.form.controls['formaPago'].value,
      rfc: this.form.controls['rfc'].value,
      razonSocial: this.form.controls['razonSocial'].value,
      regimenFiscalCliente: this.form.controls['regimenFiscalCliente'].value,
      codigoPostal: this.form.controls['codigoPostal'].value,
      correo: this.form.controls['correo'].value,
    }
  }


  
  public onlyNumbers(event) {
    let k;
    k = event.charCode;
    return (!(k > 31 && (k < 48 || k > 57)));
  }

  get formulario() {
    return this.form.controls;
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.listaClientes.filter(item => item.rfcReceptor.toLowerCase().includes(filterValue));
  }

  public caracteresValidos(event) {
    let k = event.key;
    let reg = /^[A-Za-z0-9-. ]+$/g;
    if(!reg.test(k)){
      return false
    }
  }

  public caracteresValidosRFC(event) {
    let k = event.key;
    let reg = /^[A-Za-z0-9]+$/g;
    if(!reg.test(k)){
      return false
    }
  }

  public caracteresValidosRS(event) {
    let k = event.key;
    let reg = /^[ñÑA-Za-z0-9-.]+$/g;
    if(!reg.test(k)){
      return false
    }
  }
  
  public setMayusculas(event, form){
    this.form.controls[form].setValue(event.target.value.toUpperCase())
  }

  public get width() {
    return window.innerWidth;
  }
  
}
