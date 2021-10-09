import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  recepcionRole = false;
  paquetesRole = false;
  clientesRole = false;
  productosRole = false;
  destinosRole = false;
  reportesRole = false;
  usuariosRole = false;

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    const roles: string[] = this.loginService.getRoles();
    for (const rol of roles){
      switch (rol) {
        case 'MOVE_PAQUETE':
          this.recepcionRole = true;
          break;
        case 'LIST_PAQUETE':
          this.paquetesRole = true;
          break;
        case 'LIST_CLIENTE':
          this.clientesRole = true;
          break;
        case 'EDIT_SUCURSAL':
          this.destinosRole = true;
          break;
        case 'GET_REPORTE':
          this.reportesRole = true;
          break;
        case 'LIST_USER':
          this.usuariosRole = true;
          break;
      }
    }
  }

  salir(): void {
    this.loginService.salir();
  }
}
