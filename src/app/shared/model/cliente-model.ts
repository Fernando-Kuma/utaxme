export class Cliente {
    rfc: string;
    email: string;
    idRegimenFiscal: string[];
    celular: string;
    observaciones: string;
    nombre: string;
    idPaqueteContratado: string;
    domicilio: Domicilio;
    idDespacho: string;
  }

  export class Domicilio {
      calle: string;
      numeroExt: string;
      numeroInt: string;
      colonia: string;
      estado: string;
      municipio: string;
  }