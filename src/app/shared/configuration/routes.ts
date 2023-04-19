import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { NAV } from './navegacion';
import { DashboardComponent } from 'src/app/components/home/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { NuevaContrasenaComponent } from 'src/app/components/auth/recuperacion/nueva-contrasena/nueva-contrasena.component';
import { RecuperacionContrasenaComponent } from 'src/app/components/auth/recuperacion/recuperacion-contrasena/recuperacion-contrasena.component';
import { CodigoRecuperacionComponent } from 'src/app/components/auth/recuperacion/codigo-recuperacion/codigo-recuperacion.component';
import { CancelarCfdiComponent } from 'src/app/components/home/espacio-trabajo/cancelar-cfdi/cancelar-cfdi.component';


export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: NAV.login,
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
    path: NAV.codigoRecuperacion,
    pathMatch: 'full',
    component: CodigoRecuperacionComponent,
  },
  {
    path: NAV.nuevaContrasena,
    pathMatch: 'full',
    component: NuevaContrasenaComponent,
  },
  {
    path: NAV.dashboard,
    pathMatch: 'prefix',
    component: DashboardComponent,
  },
  {
    path: NAV.cancelarCfdi,
    pathMatch: 'full',
    component: CancelarCfdiComponent,
  }
];
