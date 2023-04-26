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
import { Conceptos, ConfiguracionAvanzada } from 'src/app/shared/model/espacio-trabajo.model';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from 'src/app/shared/utils/confirm-dialog/confirm-dialog.service';



@Component({
  selector: 'app-generar-cfdi',
  templateUrl: './generar-cfdi.component.html',
  styleUrls: ['./generar-cfdi.component.css']
})
export class GenerarCfdiComponent implements OnInit {

  opcionPublicoGenera: boolean = false;
  valoresConfiguracionAvanzada: ConfiguracionAvanzada = new ConfiguracionAvanzada
  
  public form: FormGroup;
  requestDashboard: any;
  tituloProceso: string = 'Crear nueva factura'
  nombreCliente: string;
  
  regimenFiscal: any;
  catalogos: any;
  listaClientes: any;
  response: DatosFiscales;

  tablaListaConceptos: Conceptos[] = []; 
  totalConceptos: any; 
  tipoFactura: any;
  filteredOptions: Observable<any[]>;
  cacheFormulario: any;

  constructor(
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
    this.clearForm()

    
  }

  crearForm(){
    this.form = this.formBuilder.group({      
      numeroOrden: [null, [Validators.required, Validators.minLength(3)]],
      regimenFiscal: [null, [Validators.required]],
      usoCFDI: [null, [Validators.required]],
      formaPago: [null, [Validators.required]],
      
      rfc: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(13), Validators.pattern("^[A-Za-z0-9]+$")]],
      razonSocial: [null, [Validators.required, Validators.minLength(3)]],
      regimenFiscalCliente: [null, [Validators.required]],
      codigoPostal: [null, [Validators.required, Validators.minLength(5)]],
      correo: [null, [Validators.required, Validators.pattern(".+@.+\..+")]],
      ///^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    });
  }

  clearForm(){
    this.form.reset()
  }

  selecionarCliente(cliente: any){
    this.form.get('razonSocial').setValue(cliente.razonSocial);
    this.form.get('regimenFiscalCliente').setValue(cliente.regimenFiscal);
    this.form.get('codigoPostal').setValue(cliente.codigoPostal);
    this.form.get('correo').setValue(cliente.correoElectronico);
  }

  regresar(){
    this.router.navigateByUrl(NAV.espacioTrabajo)
  }

  cancelarCFDI(){
    this.form.reset()
    this.tablaListaConceptos = []
  }

  obtenerDatosFiscales(): void {
    this.dashboardService.obtenerDatosFiscales(this.requestDashboard).subscribe((resp) => {
      this.response = resp.datosFiscales;
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

  configuracionAvanzada(){
    const dialogRef = this.dialog.open(
      ConfiguracionAvanzadaComponent, 
      this.dialogService.configuracionAvanzada(this.catalogos.catalogoMetodoPago, this.valoresConfiguracionAvanzada)
    );
    dialogRef.afterClosed().subscribe(
      data => {
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
            console.log(this.tablaListaConceptos)
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
    }
  }

  

  confirmarGenerarCFDI() {
    if(this.tablaListaConceptos.length <= 0){
      console.log("Agregue al menos un concepto para generar una factura")
      return;
    }
    if(this.form.invalid){
      Object.keys(this.form.controls).forEach((field) => {
          const control = this.form.get(field);
          if (!control.valid) {
              control.markAsTouched({ onlySelf: true });
          }
      });
      return;
    }
    let tasaLocal = this.tablaListaConceptos[0].tasaLocal;
    this.tablaListaConceptos.forEach(element => {
      if(element.importe <= 0){
        console.log("No se permite facturar importes en cero o negativos, por favor rectifique")
        return;
      }
      if (element.tasaLocal != tasaLocal) {
        console.log("En el CFDI no pueden haber más de 1 concepto con el impuesto local con diferentes tasas")
        return;
      }
      if(this.tipoFactura == "AIRBNB"){
        if (element.tasa == null) {
          console.log("Para la plataforma de AIRBNB, no se permite generar un CFDI sin IVA trasladado.")
          return;
        }
        if (element.tasa == 0) {
          console.log("Para la plataforma de AIRBNB, no se permite generar un CFDI con IVA tasa 0%.")
          return;
        }
        if (element.ieps != null) {
          console.log("Para la pataforma de ARIBNB, no se permite agregar el impuesto IEPS.")
          return;
        }
      }
    });
    if(this.totalConceptos == 0.0){
      console.log("El monto de la factura debe ser mayor a cero")
      return;
    }
    this.dialogCFDI();
  }
  
  dialogCFDI(){
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent, 
      this.confirmDialogService.generarCFDI()
    );
    dialogRef.afterClosed().subscribe(
      data => {
        console.log(data)
      }
    );

  }

  /* generarCFDI() {
    let _emisor = {
      regimenFiscal: this.form.controls['regimenFiscal'].value,
      razonSocial: this.form.controls['razonSocial'].value, // Es del cliente o el usuario
      rfc: this.form.controls['rfc'].value,
    };
    let regimenFiscalAux = "";
    if (this.form.controls['regimenFiscalCliente'].value.clave == undefined) {
      regimenFiscalAux = this.form.controls['regimenFiscalCliente'].value;
    } else {
      regimenFiscalAux = this.form.controls['regimenFiscalCliente'].value.clave;
    };
    let usoCfdiaux = "";
    if (this.form.controls['usoCFDI'].value.clave == undefined) {
      usoCfdiaux = this.form.controls['usoCFDI'].value;
    } else {
      usoCfdiaux = this.form.controls['usoCFDI'].value.clave;
    };
    let _receptor = {
      razonSocial: this.form.controls['razonSocial'].value,
      rfc: this.form.controls['rfc'].value,
      cp: this.form.controls['codigoPostal'].value,
      emailPrincipal: this.form.controls['correo'].value,
      regimenFiscal: regimenFiscalAux,
      usoCfdi: usoCfdiaux
    };
    if(this.checkPublico){
      let periodicidadAux = "";
      if (this.formAvanzado.periodicidad.clave == undefined) {
        periodicidadAux = this.formAvanzado.periodicidad;
      } else {
        periodicidadAux = this.formAvanzado.periodicidad.clave;
      };
      let mesesAux = "";
      if (this.formAvanzado.meses.clave == undefined) {
        mesesAux = this.formAvanzado.meses;
      } else {
        mesesAux = this.formAvanzado.meses.clave;
      };
      let _informacionGlobal = {
        periodicidad: periodicidadAux,
        meses: mesesAux,
        anio: this.formAvanzado.anio
      }
    };
    
    let _conceptos = [];
    for (let i = 0; i < this.conceptosFinales.length; i++) {
      let _cantidad = parseFloat(this.conceptosFinales[i].cantidad);
      let _precioUnitario = parseFloat(
        this.conceptosFinales[i].valorUnitario.replace("$", "")
      );
      let _descuento = parseFloat(this.conceptosFinales[i].descuento);
      let _tasa = parseFloat(this.conceptosFinales[i].tasa);
      let _tasaAux = parseFloat(this.conceptosFinales[i].tasa);
      let _subtotal = parseFloat(
        _cantidad * _precioUnitario - _descuento
      ).toFixed(2);
      let _impuestoAplicado = parseFloat(_subtotal * _tasa).toFixed(2);

      let _tasaLocalAux = parseFloat(this.conceptosFinales[i].tasaLocal);
      let _impuestoLocalAplicado = parseFloat(
        _subtotal * _tasaLocalAux
      ).toFixed(2);

      _conceptos.push({
        nombreProductoServicio: this.conceptosFinales[i].productoServicio,
        numeroIdentificacion: this.conceptosFinales[i].identificadorSat,
        descripcion: this.conceptosFinales[i].descripcion,
        claveUnidad: this.conceptosFinales[i].claveUnidad
          .trim()
          .toUpperCase(),
        precioUnitario: _precioUnitario.toFixed(2),
        cantidad: _cantidad,
        subTotal: (parseFloat(_subtotal) + parseFloat(_descuento)).toFixed(2),
        descuento: parseFloat(_descuento).toFixed(2),
        taxObject: this.conceptosFinales[i].taxObject,
        impuestos: [
          {
            nombreImpuesto: "IVA",
            tasa:
              this.conceptosFinales[i].tasa == null
                ? "remove"
                : parseFloat(this.conceptosFinales[i].tasa).toFixed(4),
            base: _subtotal,
            total: parseFloat(
              (_subtotal * parseFloat(this.conceptosFinales[i].tasa)) / 100
            ).toFixed(2),
            isRetencion: "false",
          },
          {
            nombreImpuesto: "IEPS",
            tasa:
              this.conceptosFinales[i].ieps == null
                ? "remove"
                : parseFloat(this.conceptosFinales[i].ieps).toFixed(4),
            base: _subtotal,
            total: parseFloat(
              (_subtotal * parseFloat(this.conceptosFinales[i].ieps)) / 100
            ).toFixed(2),
            isRetencion: "false",
          },
          {
            nombreImpuesto: "ISR",
            tasa:
              this.conceptosFinales[i].isrRet == null
                ? "remove"
                : parseFloat(this.conceptosFinales[i].isrRet).toFixed(4),
            base: _subtotal,
            total: parseFloat(
              (_subtotal * parseFloat(this.conceptosFinales[i].isrRet)) / 100
            ).toFixed(2),
            isRetencion: "true",
          },
          {
            nombreImpuesto: "IVA",
            tasa:
              this.conceptosFinales[i].ivaRet == null
                ? "remove"
                : parseFloat(this.conceptosFinales[i].ivaRet).toFixed(4),
            base: _subtotal,
            total: parseFloat(
              (_subtotal * parseFloat(this.conceptosFinales[i].ivaRet)) / 100
            ).toFixed(2),
            isRetencion: "true",
          },
          {
            nombreImpuesto: "ISH",
            tasa:
              this.conceptosFinales[i].tasaLocal == null
                ? "remove"
                : parseFloat(this.conceptosFinales[i].tasaLocal).toFixed(2),
            base: _subtotal,
            total: parseFloat(
              (_subtotal * parseFloat(this.conceptosFinales[i].tasaLocal)) /
                100
            ).toFixed(2),
            isRetencion: "false",
          },
        ],
      });
    }

    try {
      let tipocfdi = this.isPlatform
        ? "I"
        : this.catalogoTiposComprobantes[0].descripcion;
      this.loadingCFDI = true;
      console.log("this.formInicial");
      console.log(this.formInicial);
      let pagoSeleccionadox = "";
      if (this.formInicial.formaPagoSeleccionado.clave == undefined) {
        pagoSeleccionadox = this.formInicial.formaPagoSeleccionado;
      } else {
        pagoSeleccionadox = this.formInicial.formaPagoSeleccionado.clave;
      }

      for (let jj = 0; jj < _conceptos.length; jj++) {
        let _impuestosAux = _conceptos[jj].impuestos.filter((obj) => {
          return obj.tasa != "remove";
        });
        _conceptos[jj].impuestos = _impuestosAux;
         //Validar taxObject 01 - No objeto de impuesto | 02 - (Sí objeto de impuesto)
        if (_conceptos[jj].impuestos.length === 0) 
          _conceptos[jj].taxObject = "01"
         else 
          _conceptos[jj].taxObject = "02";
        console.log("objeto de impuesto: " + this.taxObject);
      }

      

      let tipoFacturaAux = "";
      if (this.tipoFactura == "Ingreso") {
        tipoFacturaAux = "I";
      } else if (this.tipoFactura == "Traslado") {
        tipoFacturaAux = "T";
      } else {
        tipoFacturaAux = this.tipoFactura;
      }
      //Guardar cliente frecuente
      if(this.checkGuardarCliente) this.saveClientes();
      
      //Emitir CFDI 4.0
      const response = await operations.emitir({
        usoCfdi: usoCfdiaux, //ok
        tipoCfdi: this.checkPlataformas == true ? "I" : tipoFacturaAux, //ok
        lugarExpedicion: this.$store.state.dashboard.lugarExpedicion, //ok
        formaPago: pagoSeleccionadox, //this.formInicial.formaPagoSeleccionado.clave,//ok
        metodoPago:
          this.formAvanzado.metodoPago.clave == undefined
            ? this.formAvanzado.metodoPago
            : this.formAvanzado.metodoPago.clave, //ok
        moneda:
          this.formAvanzado.moneda.clave == undefined
            ? this.formAvanzado.moneda
            : this.formAvanzado.moneda.clave,
        plataformaTecnologica:
          this.checkPlataformas == false ? "UTAXME" : this.idTipoFactura, //new
        observaciones: "", //ok
        bancoPago: "", //ok
        cuentaBancaria: "0000", //ok
        numeroOrden: this.formInicial.noOrden,

        subTotal: (
          parseFloat(this.getSubtotalCFDI) +
          parseFloat(this.getDescuentoTotal)
        ).toFixed(2), //this.getSubtotalCFDI,
        total: this.getTotalCFDI,

        condicionesPago: this.formAvanzado.condiciones, //ok
        emisor: _emisor,
        receptor: _receptor,
        informacionGlobal: _informacionGlobal,
        conceptos: _conceptos
      });

      console.log(response);

      if (response.status == "200") {
        if (response.data.codigo == "501") {
          console.log("CFDI 501 error...");
          this.snackbar2 = true;
          this.colorSnack = "error";
          this.mensajeSnack = response.data.mensaje;
          this.dialogoCDFIMensaje = true;
        } else if (response.data.codigo == "500") {
          console.log("CFDI 500 error...");
          this.snackbar2 = true;
          this.colorSnack = "error";
          this.mensajeSnack = response.data.mensaje;
          this.dialogoCDFIMensaje = true;
        }
         else {
          console.log("CFDI generado OK...");
          this.snackbar2 = true;
          this.colorSnack = "green";
          this.mensajeSnack = "CFDI generado correctamente";
          this.dialogoConfirmaCDFI = false;
          this.dialogoCDFIMensaje = true;
          //Clean all fields
          this.clearForm();
        }
      }

      this.loadingCFDI = false;
      this.dialogoConfirmaCDFI = false;
    } catch (error) {
      console.log(error);
      console.log(error.response);

      this.loadingCFDI = false;
      this.dialogoConfirmaCDFI = false;
      this.snackbar2 = true;
      this.colorSnack = "red";
      this.mensajeSnack = "Error al generar la factura intentelo más tarde";
    }
  }; */

  publicoGeneral(value: boolean){
    console.log(value)
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
      this.form.controls['regimenFiscalCliente'].setValue(616);
      this.form.controls['codigoPostal'].setValue(Number(this.regimenFiscal.cp));
      this.form.controls['correo'].setValue(this.regimenFiscal.emailPrincipal);
    }else{
      this.form.controls['usoCFDI'].enable();
      this.form.controls['rfc'].enable();
      this.form.controls['razonSocial'].enable();
      this.form.controls['regimenFiscalCliente'].enable();
      this.form.controls['codigoPostal'].enable();
      this.form.controls['usoCFDI'].setValue(this.cacheFormulario.usoCFDI);
      this.form.controls['formaPago'].setValue(this.cacheFormulario.formaPago);
      this.form.controls['rfc'].setValue(this.cacheFormulario.rfc);
      this.selecionarCliente(this.form.controls['rfc'].value)
      this.form.controls['razonSocial'].setValue(this.cacheFormulario.razonSocial);
      this.form.controls['regimenFiscalCliente'].setValue(this.cacheFormulario.regimenFiscal);
      this.form.controls['codigoPostal'].setValue(this.cacheFormulario.codigoPostal);
      this.form.controls['correo'].setValue(this.cacheFormulario.correo);
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

  getErrorRequerido(){
    return 'Este campo es requerido';
  }

  getErrorCaracteres(cantidad: number){
    return 'Ingrese al menos ' + cantidad + ' caracteres';
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
    console.log(filterValue)
    return this.listaClientes.filter(item => item.rfcCliente.toLowerCase().includes(filterValue));
  }
  
}
