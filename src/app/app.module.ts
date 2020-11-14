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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginService} from './services/login.service';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {EcoFabSpeedDialModule} from '@ecodev/fab-speed-dial';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BuscarPaqueteComponent } from './page/paquete/partials/buscar-paquete/buscar-paquete.component';
import { ResultadoPaqueteComponent } from './page/paquete/partials/resultado-paquete/resultado-paquete.component';
import { ImportarPaquetesComponent } from './page/paquete/partials/importar-paquetes/importar-paquetes.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {PaqueteService} from './services/paquete.service';
import {ConfigurationService} from './services/configuration.service';
import {JwtService} from './services/jwt.service';
import {AuthInterceptor} from './common/interceptors/auth.interceptor';
import {EstadoMapper} from './common/mappers/estado.mapper';
import {BuscarClienteComponent} from './page/clientes/partials/buscar-cliente/buscar-cliente.component';
import {ResultadoClienteComponent} from './page/clientes/partials/resultado-cliente/resultado-cliente.component';
import {ClienteService} from './services/cliente.service';
import { EditarClienteComponent } from './page/clientes/partials/editar-cliente/editar-cliente.component';
import {MatSelectModule} from '@angular/material/select';
import {SegmentoMapper} from './common/mappers/segmento.mapper';
import {SucursalMapper} from './common/mappers/sucursal.mapper';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ColorSnackbarMapper} from './common/mappers/color-snackbar.mapper';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NgxSummernoteModule} from 'ngx-summernote';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SucursalService} from './services/sucursal.service';

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
    UsuariosComponent,
    BuscarPaqueteComponent,
    ResultadoPaqueteComponent,
    ImportarPaquetesComponent,
    BuscarClienteComponent,
    ResultadoClienteComponent,
    EditarClienteComponent
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
    MatDialogModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    EcoFabSpeedDialModule,
    FontAwesomeModule,
    MaterialFileInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatGridListModule,
    MatSlideToggleModule,
    NgxSummernoteModule,
    MatTooltipModule
  ],
  providers: [
    LoginService,
    MatDatepickerModule,
    MatNativeDateModule,
    PaqueteService,
    ClienteService,
    SucursalService,
    ConfigurationService,
    JwtService,
    EstadoMapper,
    SegmentoMapper,
    SucursalMapper,
    ColorSnackbarMapper,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
