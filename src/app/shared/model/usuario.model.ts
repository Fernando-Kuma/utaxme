
export class Usuario {
  nombre?: string;
  apellidos?: string;
  email?: string;
  password?: string;
  telefono?: number;
  aceptaTerminos?: boolean;
  propuestaId?: number;
  onboardingId?: number;
  originId?: string;
  folio?: string;
  databank?: Databank;
}

export class Databank {
  usename?: string;
  tarjeta?: number;
  anioExpira?: number;
  mesExpira?: number;
  cvt?: string;
  token?: string
}
