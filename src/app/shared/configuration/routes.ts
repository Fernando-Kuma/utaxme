import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { NAV } from './navegacion';

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
    component: HomeComponent,
  },
  {
    path: NAV.proceso,
    pathMatch: 'full',
    component: HomeComponent,
    outlet: 'home',
  },
  {
    path: NAV.activation,
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: NAV.dashboard,
    pathMatch: 'full',
    component: HomeComponent,
    outlet: 'home',
  },

  {
    path: '**',
    redirectTo: NAV.login,
  },
];
