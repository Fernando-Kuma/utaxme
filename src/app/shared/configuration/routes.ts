import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { NAV } from './navegacion';
import { DashboardComponent } from 'src/app/components/home/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { NuevaContrasenaComponent } from 'src/app/components/auth/recuperacion/nueva-contrasena/nueva-contrasena.component';
import { RecuperacionContrasenaComponent } from 'src/app/components/auth/recuperacion/recuperacion-contrasena/recuperacion-contrasena.component';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: NAV.login,
  },
  {
    path: NAV.registro,
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: NAV.descargas,
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: NAV.login,
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: NAV.recuperarContrasena,
    pathMatch: 'full',
    component: RecuperacionContrasenaComponent,
  },
  {
    path: NAV.nuevaContrasena,
    pathMatch: 'full',
    component: NuevaContrasenaComponent,
  },
  {
    path: NAV.activation,
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: NAV.proceso,
    pathMatch: 'prefix',
    component: HomeComponent,
  },
  {
    path: NAV.dashboard,
    pathMatch: 'prefix',
    component: DashboardComponent,
  }
];
