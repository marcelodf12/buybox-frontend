import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuComponent } from './common/menu/menu.component';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { LoggerModule } from 'ngx-logger';

import { environment } from 'src/environments/environment';
import {HttpClientModule} from '@angular/common/http';
import { RecepcionComponent } from './page/recepcion/recepcion.component';
import { PaqueteComponent } from './page/paquete/paquete.component';
import { ClientesComponent } from './page/clientes/clientes.component';
import { ProductosComponent } from './page/productos/productos.component';
import { DestinosComponent } from './page/destinos/destinos.component';
import { ReportesComponent } from './page/reportes/reportes.component';
import { UsuariosComponent } from './page/usuarios/usuarios.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule} from '@angular/forms';
import {LoginService} from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RecepcionComponent,
    PaqueteComponent,
    ClientesComponent,
    ProductosComponent,
    DestinosComponent,
    ReportesComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    CommonModule,
    MatMenuModule,
    FlexLayoutModule,
    MatButtonModule,
    HttpClientModule,
    LoggerModule.forRoot({
      level: environment.logLevel,
      disableConsoleLogging: false
    }),
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
