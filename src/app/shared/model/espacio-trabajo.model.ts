export class Conceptos{
    idConceptoCliente?: number;
    idCliente?: number;
    productoServicio?: string;
    identificadorSat?: number;
    descripcion?: string;
    claveUnidad?: string;
    claveImpuestoSat?: number;
    fechaRegistro?: number;
    tasa?: number;
    rfc?: string;
    unidad?: string;
    valorUnitario?: number;
    consecutivo?: number;
    claveImpuestoLocal?: any;
    ivaRet?: any;
    isrRet?: any;
    ieps?: any;
    estatus?: boolean;
    
    cantidad?: number;
    tasaLocal?: any;
    importe?: number;
    descuento?: number;

    taxObject?:any;
}


export class ConfiguracionAvanzada{
    metodoPago?: string = 'PUE';
    moneda?: string = 'MXN';
    diasCredito?: string = '0';
    condiciones?: string = 'PAGO EN UNA SOLA EXHIBICIÓN';
    periodicidad?: string = '04';
    meses?: string = '0';
    anio?: string = '0';
    configuracionGeneral?: boolean = false;
    }

    export interface CfdisFecha {
        codigo?:  string;
        mensaje?: string;
        lista?:   ListaCfdi[];
    }

export interface ListaCfdi {
    idCfdi?:        number;
    uidd?:          string;
    fechaTimbrado?: string;
    emailReceptor?: string;
    emailEnviado?:  boolean;
    referencia?:    string;
    plataforma?:    string;
    mes?:           number;
    anio?:          number;
    folio?:         number;
    rfcReceptor?:   string;
    archivoXml?:    string;
    archivoPdf?:    string;
    rfcEmisor?:     string;
    idRefUidd?:     string;
    cancelado?:     boolean;
    total?:         number;
    timeout?:       boolean;

}

export class TotalFactura {
    ivaT?: number = 0;
    ieps: number = 0;
    isrR: number = 0;
    ivaR: number = 0;
    localTraslado: number = 0;
    descuento: number = 0;
    subtotalSinDescuento: number= 0;
    subtotal: number = 0;
    total: number = 0;
}