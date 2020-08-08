import { Component, OnInit } from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-buscar-paquete',
  templateUrl: './buscar-paquete.component.html',
  styleUrls: ['./buscar-paquete.component.scss']
})
export class BuscarPaqueteComponent implements OnInit {

  filtro: FormGroup;

  constructor(private logger: NGXLogger) {
    this.filtro = new FormGroup({
      ingresoHasta: new FormControl(),
      ingresoDesde: new FormControl(),
      casilla: new FormControl(),
      vuelo: new FormControl(),
      destino: new FormControl(),
      trackProveedor: new FormControl(),
      trackPaquete: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  buscar(): void {
    this.logger.debug('Ejecutando buscar');
  }

}
