import { Component, OnInit } from '@angular/core';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-buscar-paquete',
  templateUrl: './buscar-paquete.component.html',
  styleUrls: ['./buscar-paquete.component.scss']
})
export class BuscarPaqueteComponent implements OnInit {

  filro: any;

  constructor(private logger: NGXLogger) {
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
