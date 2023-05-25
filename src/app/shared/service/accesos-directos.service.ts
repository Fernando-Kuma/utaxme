import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API } from '../configuration/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AccesosDirectosService {

  constructor(private http: HttpClient, private router: Router) { }

  modifcarAccesos(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.editarAccesos}`, request)
      .pipe(catchError((e) => {
          return throwError(e);
        })
      );
  }

  obtenerAccesosUsuario(idUsuario: any): Observable<any> {
    return this.http
      .get<any>(`${API.obtenerAccesosUsuario}/${idUsuario}`)
      .pipe(catchError((e) => {
          return throwError(e);
        })
      );
  }

  obtenerAccesos(): Observable<any> {
    return this.http
      .get<any>(`${API.obtenerAccesos}`)
      .pipe(catchError((e) => {
          return throwError(e);
        })
      );
  }


}
