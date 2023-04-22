import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API } from '../configuration/endpoints';

@Injectable({
  providedIn: 'root'
})
export class EspacioTrabajoService {

  constructor(private http: HttpClient, private router: Router) { }

  obtenerCatalogoForm(): Observable<any> {
    return this.http
      .get<any>(`${API.catalogoSat}`)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  obtenerListaFrecuentes(request: any): Observable<any> {
    let requestL = {
      rfcCliente: request.rfc
    }
    return this.http
      .post<any>(`${API.listaFrecuentes}`, requestL)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  obtenerRegimenFiscal(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.regimenFiscal}?rfc=${request.rfc}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  obtenerListaConceptos(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.listaConceptos}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }


}
