import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { NAV } from './navegacion';
import { DashboardComponent } from 'src/app/components/home/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { NuevaContrasenaComponent } from 'src/app/components/auth/recuperacion/nueva-contrasena/nueva-contrasena.component';
import { RecuperacionContrasenaComponent } from 'src/app/components/auth/recuperacion/recuperacion-contrasena/recuperacion-contrasena.component';
import { CodigoRecuperacionComponent } from 'src/app/components/auth/recuperacion/codigo-recuperacion/codigo-recuperacion.component';
import { CancelarCfdiComponent } from 'src/app/components/home/espacio-trabajo/cancelar-cfdi/cancelar-cfdi.component';
import { GenerarCfdiComponent } from 'src/app/components/home/espacio-trabajo/generar-cfdi/generar-cfdi.component';
import { ClientesFrecuentesComponent } from 'src/app/components/home/espacio-trabajo/clientes-frecuentes/clientes-frecuentes.component';
import { CrearProdServComponent } from 'src/app/components/home/espacio-trabajo/crear-prod-serv/crear-prod-serv.component';
import { EspacioTrabajoComponent } from 'src/app/components/home/espacio-trabajo/espacio-trabajo.component';
import { FullSizeComponent } from 'src/app/graphics/full-size/full-size.component';


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
  },
  {
    path: NAV.generarCfdi,
    pathMatch: 'full',
    component: GenerarCfdiComponent,
  },
  {
    path: NAV.clientesFrecuentes,
    pathMatch: 'full',
    component: ClientesFrecuentesComponent,
  },
  {
    path: NAV.crearProdServ,
    pathMatch: 'full',
    component: CrearProdServComponent,
  },
  {
    path: NAV.espacioTrabajo,
    pathMatch: 'full',
    component: EspacioTrabajoComponent,
  },{
    path: NAV.fullSize,
    pathMatch: 'full',
    component: FullSizeComponent,
  },{
    path: NAV.crearCfdi,
    pathMatch: 'full',
    component: GenerarCfdiComponent,
  },

];
