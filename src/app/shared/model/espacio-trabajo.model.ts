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