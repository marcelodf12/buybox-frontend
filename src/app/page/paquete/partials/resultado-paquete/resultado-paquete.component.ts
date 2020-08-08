import { Component, OnInit } from '@angular/core';
import {Producto} from '../../../../interface/producto.interface';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-resultado-paquete',
  templateUrl: './resultado-paquete.component.html',
  styleUrls: ['./resultado-paquete.component.scss']
})
export class ResultadoPaqueteComponent implements OnInit {

  dummySource: Producto[];
  displayedColumns: string[];

  constructor(
    private logger: NGXLogger,
  ) {
    this.displayedColumns = ['casilla', 'cliente', 'trackPaquete', 'trackProveedor', 'ingreso', 'destino'];
    this.dummySource = [
      { casilla: 'BYB0001', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: '20/01/2020', destino: 'string'},
      { casilla: 'BYB0002', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: '20/01/2020', destino: 'string'},
      { casilla: 'BYB0003', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: '20/01/2020', destino: 'string'},
      { casilla: 'BYB0004', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: '20/01/2020', destino: 'string'},
      { casilla: 'BYB0005', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: '20/01/2020', destino: 'string'},
      { casilla: 'BYB0006', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: '20/01/2020', destino: 'string'},
      { casilla: 'BYB0007', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: '20/01/2020', destino: 'string'},
      { casilla: 'BYB0008', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: '20/01/2020', destino: 'string'},
      { casilla: 'BYB0009', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: '20/01/2020', destino: 'string'},
      { casilla: 'BYB0010', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', ingreso: '20/01/2020', destino: 'string'}
    ];
    this.dummySource = [];
  }


  ngOnInit(): void {
  }

}
