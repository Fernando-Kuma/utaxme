import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuardHelper  {

    auth: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        //private accountService: AdministratorService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.authService.usuario == null){
            this.authService.logout()
            return false;
          }
        return true;
    }
    /*

    private userRolValid(user: AdministratorLoginModel, route: ActivatedRouteSnapshot): boolean {
        if (!user || !user.tbCatPerfil || !route || !route.url) {
            return false;
        }
        if (route.data && route.data.role) {
            return route.data.role.includes(user.tbCatPerfil.descripcion);
        }
        return true;
    }
    */

}