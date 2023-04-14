import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API } from '../configuration/endpoints';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private router: Router) { }

  validarCliente(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.validaCliente}?folioUtaxme=${request.folio}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }
  
  obtenerDatosFiscales(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.datosFiscales}?rfc=${request.rfc}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  obtenerCumplimientoFiscal(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.cumplimiento}?rfc=${request.rfc}&anio=${request.anio}&mes=${request.mes}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  obtenerIngresosGastos(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.ingresosEgresos}?rfc=${request.rfc}&anio=${request.anio}&mes=${request.mes}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }



}
