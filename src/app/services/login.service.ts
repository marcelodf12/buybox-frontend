import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';

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
    private router: Router
  ) {
    this.autenticado = new Subject<boolean>();
    this.autenticado.next(false);
  }

  estaAutenticadoSubject(): Subject<boolean> {
    return this.autenticado;
  }

  login(usuario: string, password: string): void{
    this.autenticado.next(true);
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
      this.router.navigate(['/paquetes']);
      this.autenticado.next(true);
    }else{
      this.router.navigate(['/']);
      this.autenticado.next(false);
    }
  }

  salir(): void{
    localStorage.removeItem('Authorization');
    this.checkLogin();
  }
}
