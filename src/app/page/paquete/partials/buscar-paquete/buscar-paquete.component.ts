import { Component, OnInit } from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {FormControl, FormGroup} from '@angular/forms';
import {PaqueteService} from '../../../../services/paquete.service';

@Component({
  selector: 'app-buscar-paquete',
  templateUrl: './buscar-paquete.component.html',
  styleUrls: ['./buscar-paquete.component.scss']
})
export class BuscarPaqueteComponent implements OnInit {

  filtro: FormGroup;

  constructor(
    private logger: NGXLogger,
    private paqueteService: PaqueteService
  ) {
    this.filtro = new FormGroup({
      ingresoHasta: new FormControl(),
      ingresoDesde: new FormControl(),
      casilla: new FormControl(),
      vuelo: new FormControl(),
      destino: new FormControl(),
      cliente: new FormControl(),
      trackPaquete: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  buscar(): void {
    this.logger.debug('Ejecutando buscar ' + typeof(this.filtro.get('ingresoHasta').value));
    this.paqueteService.getPaquetes(
      this.filtro.get('cliente').value,
      this.filtro.get('trackPaquete').value,
      this.filtro.get('casilla').value,
      '',
      '',
      this.filtro.get('ingresoHasta').value,
      this.filtro.get('ingresoDesde').value,
      null,
      this.filtro.get('vuelo').value,
      0,
      10,
      '');
  }

}
