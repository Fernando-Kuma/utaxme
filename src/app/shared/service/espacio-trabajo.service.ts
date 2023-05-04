import { HttpClient} from '@angular/common/http';
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

  crearCliente(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.guardarCliente}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  borrarCliente(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.borrarCliente}`, request)
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

  emitirCFDI(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.emitirCFDI}`, request)
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


  obtenerCatalogoProductos(textoFiltro: string): Observable<any> {
    let request = {
      filtro: textoFiltro
    }
    return this.http
      .post<any>(`${API.catalogoProductos}?filtro=${textoFiltro}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  crearNuevoConcepto(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.agregarConcepto}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  actualizarConcepto(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.actualizarConcepto}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  eliminarConcepto(idConcepto: any): Observable<any> {
    let request = {}
    return this.http
      .post<any>(`${API.eliminarConcepto}?idConcepto=${idConcepto}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  busquedaCfdiFecha(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.busquedaCfdi}?rfc=${request.rfc}&fechaInicialFilter=${request.fechaInicialFilter}&fechaFinFilter=${request.fechaFinFilter}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  busquedaCfdiOrden(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.busquedaCfdi}?rfc=${request.rfc}&referencia=${request.referencia}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }


  cancelarCfdi(){
    
  }

}
