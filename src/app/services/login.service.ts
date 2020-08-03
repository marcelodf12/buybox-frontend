import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  autenticado: Subject<boolean>;

  constructor() {
    this.autenticado = new Subject<boolean>();
    this.autenticado.next(false);
  }

  estaAutenticadoSubject(): Subject<boolean> {
    return this.autenticado;
  }

  autenticar(usuario: string, password: string): void{
    this.autenticado.next(true);
  }

  salir(): void{
    this.autenticado.next(false);
  }
}
