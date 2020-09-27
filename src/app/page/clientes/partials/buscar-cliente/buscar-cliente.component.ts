import { Component, OnInit } from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {FormControl, FormGroup} from '@angular/forms';
import {ClienteService} from '../../../../services/cliente.service';

@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrls: ['./buscar-cliente.component.scss']
})
export class BuscarClienteComponent implements OnInit {

  filtro: FormGroup;

  constructor(
    private logger: NGXLogger,
    private clienteService: ClienteService
  ) {
    this.filtro = new FormGroup({
      casilla: new FormControl(),
      correo: new FormControl(),
      cedula: new FormControl(),
      cliente: new FormControl(),
    });
  }

  ngOnInit(): void {
  }

  buscar(): void {
    this.clienteService.setFilter(
      this.filtro.get('cliente').value,
      this.filtro.get('casilla').value,
      this.filtro.get('correo').value,
      this.filtro.get('cedula').value
    );
    this.clienteService.getClientes(
      0,
      '');
  }

}
