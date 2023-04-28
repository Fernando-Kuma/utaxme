export class CumplimientoFiscal {
  anio?: number;
  mes?: string;
  montoPagar?: number;
  montoRecargosMulta?: number;
  saldoFavor?: number;
  flagSaldoFavorUtilizado?: boolean;
  estatus?: string;
  listDocumentos?: ListaDocumentos[];
}

export class ListaDocumentos {
  url?: string;
  tipo?: string;
}


export class DatosFiscales {
  calle?: string;
  ciudad?: string;
  colonia?: string;
  cp?: number;
  municipio?: string;
  numeroExterior?: number;
  numeroInterior?: number;
  estado?: string;
  emailPrincipal?: string;
  rfc?: string;
  diaEnvioFacturas?: string;
  wireLessActivado?: string;
  razonSocial?: string;
  inboxCorreoCfdi?: string;
  telPrincipal?: boolean;
  telefonoServicioCliente?: string;
  regimenFiscal?: string;
  idSat?: number;
  isCSD?: boolean;
}


export class ComprobantePeriodo{
  facturas?: number = 0;
  total?: number = 0;
  subtotal?: number = 0;
  iva?: number = 0;
  ivaRetenido?: number = 0;
  isrRetenido?: number = 0;
  tipoComprobante?: string = '';
  detalles?: DetalleData[];
}

export class DetalleData{
  factura: number;
  total: number;
}


export interface Deducciones {
  deduccionesFiscales?: DeduccionesFiscale[];
  codigo?:              string;
  mensaje?:             string;
}

export interface DeduccionesFiscale {
  deduccionId?: number;
  clave?:       string;
  descripcion?: string;
  tipo?:        string;
  aplica?:      Aplica;
  requisitos?:  string;
  detalle?:     string;
  estatus?:     boolean;
}

export enum Aplica {
  Anual = "Anual",
  Mensual = "Mensual",
}
