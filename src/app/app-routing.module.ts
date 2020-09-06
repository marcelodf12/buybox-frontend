import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './page/home/home.component';
import {RecepcionComponent} from './page/recepcion/recepcion.component';
import {PaqueteComponent} from './page/paquete/paquete.component';
import {ClientesComponent} from './page/clientes/clientes.component';
import {ProductosComponent} from './page/productos/productos.component';
import {DestinosComponent} from './page/destinos/destinos.component';
import {ReportesComponent} from './page/reportes/reportes.component';
import {UsuariosComponent} from './page/usuarios/usuarios.component';
import {PrivateGuard} from './common/guards/private.guard';
import {PublicGuard} from './common/guards/public.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [PrivateGuard]},
  { path: 'login', component: HomeComponent, canActivate: [PublicGuard]},
  { path: 'recepcion', component: RecepcionComponent, canActivate: [PrivateGuard] },
  { path: 'paquetes', component: PaqueteComponent, canActivate: [PrivateGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [PrivateGuard] },
  { path: 'productos', component: ProductosComponent, canActivate: [PrivateGuard] },
  { path: 'destinos', component: DestinosComponent, canActivate: [PrivateGuard] },
  { path: 'reportes', component: ReportesComponent, canActivate: [PrivateGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [PrivateGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
