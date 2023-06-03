import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { API } from '../configuration/endpoints';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient, private router: Router) { }

  guardarCliente(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.admin.cliente.nuevoCliente}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  obtenerClientes(anio,mes): Observable<any> {
    return this.http
      .get<any>(`${API.admin.cliente.obtenerClientes}?anio=${anio}&mes=${mes}`)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  obtenerConceptosCliente(request: any): Observable<any> {
    return request
  }

  actualizarConcepto(request: any): Observable<any> {
    return this.http
    .post<any>(`${API.admin.cliente.configurarConceptos}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  eliminarConcepto(idConcepto: any): Observable<any> {
    let request = {}
    return idConcepto
  }


}
