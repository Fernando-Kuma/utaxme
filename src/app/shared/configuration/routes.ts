import { Routes } from '@angular/router';
import { NAV } from './navegacion';
import { DashboardComponent } from 'src/app/components/client/home/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/components/client/auth/login/login.component';
import { NuevaContrasenaComponent } from 'src/app/components/client/auth/recuperacion/nueva-contrasena/nueva-contrasena.component';
import { RecuperacionContrasenaComponent } from 'src/app/components/client/auth/recuperacion/recuperacion-contrasena/recuperacion-contrasena.component';
import { CodigoRecuperacionComponent } from 'src/app/components/client/auth/recuperacion/codigo-recuperacion/codigo-recuperacion.component';
import { CancelarCfdiComponent } from 'src/app/components/client/home/espacio-trabajo/cancelar-cfdi/cancelar-cfdi.component';
import { GenerarCfdiComponent } from 'src/app/components/client/home/espacio-trabajo/generar-cfdi/generar-cfdi.component';
import { ClientesFrecuentesComponent } from 'src/app/components/client/home/espacio-trabajo/clientes-frecuentes/clientes-frecuentes.component';
import { CrearProdServComponent } from 'src/app/components/client/home/espacio-trabajo/crear-prod-serv/crear-prod-serv.component';
import { EspacioTrabajoComponent } from 'src/app/components/client/home/espacio-trabajo/espacio-trabajo.component';
import { FullSizeComponent } from 'src/app/graphics/full-size/full-size.component';
import { AuthGuardHelper } from '../helper/authGuard.helper';
import { PerfilComponent } from 'src/app/components/client/home/home-mobile/perfil/perfil.component';
import { SaludFiscalComponent } from 'src/app/components/client/home/home-mobile/salud-fiscal/salud-fiscal.component';
import { BandejaEntradaComponent } from 'src/app/components/client/home/bandeja-entrada/bandeja-entrada.component';
import { DatosFiscalesComponent } from 'src/app/components/client/home/home-mobile/datos-fiscales/datos-fiscales.component';


import { LoginComponentAdmin } from 'src/app/components/admin/auth/login/login.component';
import { AccesosDirectosComponent } from 'src/app/components/admin/home/accesos-directos/accesos-directos.component';
import { HomeComponent } from 'src/app/components/admin/home/home.component';
import { EspacioTrabajoAdminComponent } from 'src/app/components/admin/home/espacio-trabajo/espacio-trabajo.component';
import { NuevoClienteComponent } from 'src/app/components/admin/home/espacio-trabajo/clientes/nuevo-cliente/nuevo-cliente.component';
import { ClientesComponent } from 'src/app/components/admin/home/espacio-trabajo/clientes/clientes.component';



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
    canActivate: [AuthGuardHelper],
  },
  {
    path: NAV.cancelarCfdi,
    pathMatch: 'full',
    component: CancelarCfdiComponent,
    canActivate: [AuthGuardHelper],
  },
  {
    path: NAV.generarCfdi,
    pathMatch: 'full',
    component: GenerarCfdiComponent,
    canActivate: [AuthGuardHelper],
  },
  {
    path: NAV.clientesFrecuentes,
    pathMatch: 'full',
    component: ClientesFrecuentesComponent,
    canActivate: [AuthGuardHelper],
  },
  {
    path: NAV.crearProdServ,
    pathMatch: 'full',
    component: CrearProdServComponent,
    canActivate: [AuthGuardHelper],
  },
  {
    path: NAV.espacioTrabajo,
    pathMatch: 'full',
    component: EspacioTrabajoComponent,
    canActivate: [AuthGuardHelper],
  },{
    path: NAV.fullSize,
    pathMatch: 'full',
    component: FullSizeComponent,
    canActivate: [AuthGuardHelper],
  },{
    path: NAV.perfil,
    pathMatch: 'full',
    component: PerfilComponent,
    canActivate: [AuthGuardHelper],
  },{
    path: NAV.saludFiscal,
    pathMatch: 'full',
    component: SaludFiscalComponent,
    canActivate: [AuthGuardHelper],
  },{
    path: NAV.bandejaEntrada,
    pathMatch: 'full',
    component: BandejaEntradaComponent,
  },{
    path: NAV.datosFiscales,
    pathMatch: 'full',
    component: DatosFiscalesComponent,
    canActivate: [AuthGuardHelper],
  },

  {
    path: NAV.loginAdmin,
    pathMatch: 'prefix',
    component: LoginComponentAdmin,
  },
  {
    path: NAV.homeAdmin,
    pathMatch: 'prefix',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: AccesosDirectosComponent,
        outlet: 'admin',
      },
      {
        path: 'espacio-trabajo',
        component: EspacioTrabajoAdminComponent,
        outlet: 'admin',
      },
      {
        path: NAV.clientes,
        component: ClientesComponent,
        outlet: 'admin',
      }
    ],
  },

];
