import { Component, OnInit } from '@angular/core';

import { Producto } from '../../interface/producto.interface';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.scss']
})
export class PaqueteComponent implements OnInit {
  dummySource: Producto[];
  displayedColumns: string[];
  filro: any;

  constructor(
    private logger: NGXLogger,
  ) {
    this.displayedColumns = ['casilla', 'cliente', 'trackPaquete', 'trackProveedor','ingreso','destino'];
    this.dummySource = [
      { casilla: 'BYB0001', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: 'string', destino: 'string'},
      { casilla: 'BYB0002', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: 'string', destino: 'string'},
      { casilla: 'BYB0003', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: 'string', destino: 'string'},
      { casilla: 'BYB0004', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: 'string', destino: 'string'},
      { casilla: 'BYB0005', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: 'string', destino: 'string'},
      { casilla: 'BYB0006', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: 'string', destino: 'string'},
      { casilla: 'BYB0007', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: 'string', destino: 'string'},
      { casilla: 'BYB0008', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: 'string', destino: 'string'},
      { casilla: 'BYB0009', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: 'string', destino: 'string'},
      { casilla: 'BYB0010', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: 'string', destino: 'string'}
    ];
    this.filro = {
      trackPaquete: '',
      trackProveedor: '',
      ingresoDesde: '',
      ingresoHasta: '',
      casilla: '',
      vuelo: '',
      destino: ''
    };
  }

  ngOnInit(): void {
  }

  buscar(): void {
    this.logger.debug('Ejecutando buscar');
  }
}
