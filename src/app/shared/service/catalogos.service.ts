import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API } from '../configuration/endpoints';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient, private router: Router) { }

  obtenerRegimenFiscales(tipoPersona): Observable<any> {
    return this.http
      .get<any>(`${API.admin.catalogos.regimenFiscal}?tipoPersona=${tipoPersona}`)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  obtenerPaquetes(): Observable<any> {
    return this.http
      .get<any>(`${API.admin.catalogos.paquetesCliente}`)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  obtenerContadores(): Observable<any> {
    return this.http
      .get<any>(`${API.admin.catalogos.contadores}`)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  obtenerCP(cp): Observable<any> {
    return this.http
      .get<any>(`${API.admin.catalogos.entidades}?cp=${cp}`)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  obtenerEstados(): Observable<any> {
    return this.http
      .get<any>(`${API.admin.catalogos.estados}`)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  obtenerFormasPago(): Observable<any> {
    return this.http
      .get<any>(`${API.admin.catalogos.formaPago}`)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }
}
