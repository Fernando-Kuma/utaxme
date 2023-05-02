import { environment } from 'src/environments/environment';

export const API = {

  login: environment.apiAuth + 'admin/find',
  payment: environment.apiAuth + 'admin/find/payment',
  validaCliente: environment.apiDashboard + 'ValidaClienteUtaxmeForm.htm',

  datosFiscales: environment.apiDashboard + 'DatosFiscalesForm.htm',
  cumplimiento: environment.apiDashboard + 'CumplimientoFiscalForm.htm',
  ingresosEgresos: environment.apiDashboard + 'ReporteIngresosEgresosForm.htm',

  deduccionesFiscales: environment.apiDashboard + 'DeduccionesFiscalesForm.htm',
  saludFiscal: environment.apiDashboard + 'BaseGravableForm.htm',


  catalogoSat: environment.apiDashboard + 'CatalogosSatForm.htm',
  listaFrecuentes: environment.apiDashboard + 'clientes/frecuentes/list',
  clientesCount: environment.apiDashboard + 'cfdis/clientes/count',
  regimenFiscal: environment.apiDashboard + 'cfdi/regimenfiscal',
  listaConceptos: environment.apiDashboard + 'conceptos/clientes/consultar',
  catalogoProductos: environment.apiDashboard + 'CatalogoProductoSatForm.htm',
  agregarConcepto: environment.apiDashboard + 'conceptos/clientes/agregar',
  actualizarConcepto: environment.apiDashboard + 'conceptos/clientes/actualizar',
  emitirCFDI: environment.apiDashboard + 'cfdi/emitir/v4',

  cfdiGeneradosFilter: environment.apiDashboard+ 'CfdiGeneradosFilter.htm',
  reporteFacturas: environment.apiDashboard + 'DownloadReporteValidacionFacturasForm.htm',
  busquedaCfdi: environment.apiDashboard + 'CfdiGeneradosFilter.htm',

  
  /* getWord: environment.api + 'wordwise/entries?limit=1&headword=',
  login: environment.api + 'utaxon/admin/find',
  dataBank: environment.api + 'utaxon/admin/dataBank',
  transaccion: environment.api + 'utaxon/pago/transaccion',
  questionary: environment.api + 'utaxon/questionary/',
  paidOff: environment.api + 'utaxon/proposal/paidOff',
  pending: environment.api + 'utaxon/proposal/pending',
  catalogosProductos: environment.api + 'utaxon/catalogs/paquetes',
  register: environment.api + 'utaxon/admin/register',
    
  
  
  CfdiGeneradosForm: environment.apiCfdi + 'CfdiGeneradosForm.htm',
  catalogosSatForm: environment.apiCfdi + 'CatalogosSatForm.htm',
  catalogoProductosSAT: environment.apiCfdi + 'CatalogoProductoSatForm.htm',
  
  cancelarCFDI: environment.apiCfdiRest + 'cfdi/',
  countCFDIS: environment.apiCfdiRest + 'cfdis/clientes/count',
  agregarConcepto: environment.apiCfdiRest + 'conceptos/clientes/agregar',
  eliminarConcepto: environment.apiCfdiRest + 'conceptos/clientes/eliminar',
  actualizarConcepto: environment.apiCfdiRest + 'conceptos/clientes/actualizar',
  consultarConceptos: environment.apiCfdiRest + 'conceptos/clientes/consultar',
  listRegFiscalUsuario: environment.apiCfdiRest + 'cfdi/regimenfiscal',
  emitir: environment.apiCfdiRest + 'cfdi/emitir/v4',
  getClientesList: environment.apiCfdiRest + 'clientes/frecuentes/list',
  saveClientes: environment.apiCfdiRest + 'clientes/frecuentes/save',
  deleteClientes: environment.apiCfdiRest + 'clientes/frecuentes/delete',
  downloadReporteValidacionFacturasForm: environment.apiCfdiRest + 'DownloadReporteValidacionFacturasForm.htm', */
  

}
