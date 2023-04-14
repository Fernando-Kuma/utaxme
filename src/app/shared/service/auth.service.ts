import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API } from '../configuration/endpoints';
import { Constantes } from '../configuration/date-graph';
import { Usuario } from '../model/usuario.model';
import { Router } from '@angular/router';
import { NAV } from '../configuration/navegacion';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: Usuario;

  constructor(private http: HttpClient, private router: Router) { }

  login(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.login}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  getIp(){
    fetch(Constantes.URL_API, {
      method: 'GET',
    }).then(respuestaRaw => respuestaRaw.json())
    .then(respuesta => {
      localStorage.setItem('ipDispositivo',respuesta.ip)
    });;
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl(NAV.login);
  }

  public get usuario(): Usuario {
    if (this._user != null) {
      return this._user;
    } else if ( this._user == null && sessionStorage.getItem('admin-user') != null) {
      this._user = JSON.parse(sessionStorage.getItem('admin-user')) as Usuario;
      return this._user;
    }
    return null;
  }
  

}
