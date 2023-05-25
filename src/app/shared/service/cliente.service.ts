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
}
