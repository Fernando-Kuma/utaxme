import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API } from '../configuration/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AdministrarPagosService {

  constructor(private http: HttpClient) { }

  obtenerClientesPago(anio,mes): Observable<any> {
    return this.http
      .get<any>(`${API.admin.cliente.obtenerClientesPago}?anio=${anio}&mes=${mes}`)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

}
