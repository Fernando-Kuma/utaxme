import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API } from '../configuration/endpoints';
import { Constantes } from '../helper/date-graph';
import { Usuario } from '../model/usuario.model';
import { Router } from '@angular/router';
import { NAV } from '../configuration/navegacion';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: Usuario;

  private _admin: any;

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

  payment(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.payment}`, request)
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

  logoutAdmin(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl(NAV.loginAdmin);
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

  enviarCodigoPass(email: string,rfc: string) {
    return this.http
      .post<any>(`${API.validarCorreo}?email=${email}&rfc=${rfc}`, {})
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  validarCodigoPass(email: string,rfc: string,token: string) {
    return this.http
      .post<any>(`${API.validarCodigo}?email=${email}&rfc=${rfc}&token=${token}`, {})
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

  cambiarContraseña(rfc: string,contraseña: string) {
    return this.http
      .post<any>(`${API.cambiarContraseña}?rfc=${rfc}&password=${contraseña}`, {})
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }
  



  public get administrador(): any {
    if (this._admin != null) {
      return this._admin;
    } else if ( this._admin == null && sessionStorage.getItem('root-user') != null) {
      this._admin = JSON.parse(sessionStorage.getItem('root-user')) as any;
      return this._admin;
    }
    return null;
  }

  loginAdmin(request: any): Observable<any> {
    return this.http
      .post<any>(`${API.adminLogin}`, request)
      .pipe(
        catchError((e) => {
          return throwError(e);
        })
      );
  }

}
