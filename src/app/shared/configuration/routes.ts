import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { NAV } from './navegacion';
import { DashboardComponent } from 'src/app/components/home/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/components/auth/login/login.component';

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
