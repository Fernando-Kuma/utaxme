import { environment } from 'src/environments/environment';

export const API = {

  login: environment.api + 'utaxon/admin/find',
  payment: environment.api + 'utaxon/admin/find/payment',

  
  validaCliente: environment.api + 'billerTicket-mobile/ValidaClienteUtaxmeForm.htm',
  datosFiscales: environment.api + 'billerTicket-mobile/DatosFiscalesForm.htm',
  cumplimiento: environment.api + 'billerTicket-mobile/CumplimientoFiscalForm.htm',
  ingresosEgresos: environment.api + 'billerTicket-mobile/ReporteIngresosEgresosForm.htm',
  CfdiGeneradosFilter: environment.api+ 'billerTicket-mobile/CfdiGeneradosFilter.htm',

  /* getWord: environment.api + 'wordwise/entries?limit=1&headword=',
  login: environment.api + 'utaxon/admin/find',
  dataBank: environment.api + 'utaxon/admin/dataBank',
  transaccion: environment.api + 'utaxon/pago/transaccion',
  questionary: environment.api + 'utaxon/questionary/',
  paidOff: environment.api + 'utaxon/proposal/paidOff',
  pending: environment.api + 'utaxon/proposal/pending',
  findPayment: environment.api + 'utaxon/admin/find/payment',
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
