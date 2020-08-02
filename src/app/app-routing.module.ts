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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recepcion', component: RecepcionComponent },
  { path: 'paquetes', component: PaqueteComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'destinos', component: DestinosComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'usuarios', component: UsuariosComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
