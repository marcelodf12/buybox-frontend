import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {PermisosConst} from '../common/constants';
import {JwtService} from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  private apiUrl: string = environment.apiUrl + 'login';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  token: string = null;

  autenticado: Subject<boolean>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtService: JwtService
  ) {
    this.autenticado = new Subject<boolean>();
    this.autenticado.next(false);
  }

  estaAutenticadoSubject(): Subject<boolean> {
    return this.autenticado;
  }

  login(usuario: string, password: string): void{
    const params = new HttpParams();
    this.http.post(
      `${this.apiUrl}`,
      {correo : usuario, pass : password },
      {headers: this.headers, params, observe: 'response'}).toPromise().then(res => {
      this.token = res.headers.get('Authorization').replace('Bearer', '').trim();
      localStorage.setItem('Authorization', this.token);
      this.checkLogin();
    });
  }

  checkLogin(): void{
    console.log('check session');
    if ( !!localStorage.getItem('Authorization')){
      this.router.navigate(['/usuarios']);
      this.autenticado.next(true);
    }else{
      this.router.navigate(['/login']);
      this.autenticado.next(false);
    }
  }

  salir(): void{
    localStorage.removeItem('Authorization');
    this.checkLogin();
  }

  isAdmin(): boolean {
    const token: string = localStorage.getItem('Authorization');
    let isAdmin = false;
    if (!!token){
      const isValidToken = this.jwtService.isValidToken(token);
      if (isValidToken) {
        for (const permiso of PermisosConst.adminPermisos) {
          for (const permisoJwt of this.jwtService.getPermisos(token)) {
            if (permiso === permisoJwt) {
              isAdmin = true;
              break;
            }
          }
          if (isAdmin) {
            break;
          }
        }
      }
    }
    return isAdmin;
  }

  getRoles(): string[]{
    const token: string = localStorage.getItem('Authorization');
    if (!!token){
      const isValidToken = this.jwtService.isValidToken(token);
      if (isValidToken) {
        return this.jwtService.getPermisos(token);
      }
    }
    return [];
  }
}
