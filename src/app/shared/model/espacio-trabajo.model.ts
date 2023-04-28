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
    
    tasaLocal?: any;
    importe?: number;
    descuento?: number;
}


export class ConfiguracionAvanzada{
    metodoPago?: string = 'PUE';
    moneda?: string = 'MXN';
    diasCredito?: string = '0';
    condiciones?: string = 'PAGO EN UNA SOLA EXHIBICIÓN';
    periodicidad?: string = '04';
    meses?: string;
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