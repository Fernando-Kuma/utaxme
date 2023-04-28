import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'text/plain'});
    const options = { headers: headers };
    
    return this.http
      .post<any>(`${API.validaCliente}?folioUtaxme=${request.folio}`, request, options)
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

  obtenerReporte(request: any): Observable<any> {
    const options: any = {
      responseType: 'blob' as const,
    };
    return this.http
      .post<any>(`${API.reporteFacturas}?rfc=${request.rfc}&anio=${request.anio}&mes=${request.mes}`, request, options)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  obtenerClieteCount(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.clientesCount}?rfc=${request.rfc}&anio=${request.anio}&mes=${request.mes}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  obtenerDeduccionesFiscales(): Observable<any> {
    return this.http
      .get<any>(`${API.deduccionesFiscales}`)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  obtenerSaludFiscal(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.saludFiscal}?rfc=${request.rfc}&anio=${request.anio}&mes=${request.mes}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  


}
