import { Injectable } from '@angular/core';
import { Constantes } from '../configuration/date-graph';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }


  getIp(){
    fetch(Constantes.URL_API, {
      method: 'GET',
    }).then(respuestaRaw => respuestaRaw.json())
    .then(respuesta => {
      localStorage.setItem('ipDispositivo',respuesta.ip)
    });;
  }

}
