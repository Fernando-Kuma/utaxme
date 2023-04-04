import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthGuardHelper  {

    auth: boolean = false;

    constructor(
        private router: Router,
        //private accountService: AdministratorService
    ) { }

    /*
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let user = this.accountService.userValue;
        if (!this.userRolValid(user, route)) {
            this.router.navigate(['login-administrator']);
            return false;
        }
        return true;
    }

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