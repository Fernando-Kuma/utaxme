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

  obtenerRegimenFiscales(): Observable<any> {
    return this.http
      .get<any>(`${API.admin.catalogos.regimenFiscal}`)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }
}
