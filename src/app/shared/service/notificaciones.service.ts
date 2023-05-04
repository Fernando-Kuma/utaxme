import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API } from '../configuration/endpoints';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(private http: HttpClient, private router: Router) { }

  obtenerNotificacion(request: any): Observable<any> {
    return this.http
      .get<any>(`${API.notificacionesCliente}?rfc=${request}`)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  marcarLeidoNotificacion(request: any): Observable<any> {

    let parametros = new HttpParams();
    parametros = parametros.append('idNotificacion',request.idNotificacion);
    parametros = parametros.append('rfc',request.rfc);

    const opciones = {
      headers: new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded'
      }),
      params: parametros
    };

    return this.http
      .post<any>(`${API.notificationLeida}`, request, opciones)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  asignarNotificacion(request: any): Observable<any> {
    let body = {
      idNotificacion : 2,
      rfc: 'UISJ810814P84'
    }
    return this.http
      .post<any>(`${API.asignarNotificacion}`, body)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  actualizarNotificacion(request: any): Observable<any> {
    let body = {
      titulo: 'Prueba de Actualizaciòn Notificacion',
      mensaje: 'Este es el mensaje de la notificaciòn que se va a crear. Actualizado',
      idNotificacion : 1,
    }
    return this.http
      .post<any>(`${API.actualizarNotificacion}`, body)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  

  enviarNotificacionMasiva(request: any): Observable<any> {
    let body = {
      idNotificacion : 2,
    }
    return this.http
      .post<any>(`${API.nuevoNotificacionMasivai}`, body)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  enviarNotificacion(request: any): Observable<any> {
    let body = {
      titulo : 'Prueba Notificacion',
      mensaje : 'Este es el mensaje de la notificaciòn que se va a crear.',
    }
    return this.http
      .post<any>(`${API.nuevoNotificacion}`, body)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

}
