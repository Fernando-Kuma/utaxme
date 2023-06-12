import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API } from '../configuration/endpoints';
@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(private http: HttpClient) { }


  obtenerPerfiles(): Observable<any> {
    return this.http
      .get<any>(`${API.admin.catalogos.perfilesUsuario}`)
      .pipe(catchError((e) => {
          return throwError(e);
        })
      );
  }

  obtenerEquipo(idUsuario: any): Observable<any> {
    return this.http
      .get<any>(`${API.admin.equipo.listaEquipo}/${idUsuario}`)
      .pipe(catchError((e) => {
          return throwError(e);
        })
      );
  }

  editarEquipo(idUsuario: any, request): Observable<any> {
    return this.http
      .put<any>(`${API.admin.equipo.listaEquipo}/${idUsuario}`, request)
      .pipe(catchError((e) => {
          return throwError(e);
        })
      );
  }

  eliminarEquipo(idUsuario: any): Observable<any> {
    return this.http
      .delete<any>(`${API.admin.equipo.listaEquipo}/${idUsuario}`)
      .pipe(catchError((e) => {
          return throwError(e);
        })
      );
  }

}
