import { Component, OnInit } from '@angular/core';
import {Producto} from '../../../../interface/producto.interface';
import {NGXLogger} from 'ngx-logger';
import {PAGE_SIZE_OPTIONS} from '../../../../common/constants';
import {PaqueteService} from '../../../../services/paquete.service';
import {Paquete} from '../../../../common/models/paquete.model';

@Component({
  selector: 'app-resultado-paquete',
  templateUrl: './resultado-paquete.component.html',
  styleUrls: ['./resultado-paquete.component.scss']
})
export class ResultadoPaqueteComponent implements OnInit {

  dummySource: Paquete[];
  displayedColumns: string[];
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;

  constructor(
    private logger: NGXLogger,
    private paqueteService: PaqueteService,
  ) {
    this.paqueteService.getPaquetes(
      '',
      '',
      '',
      '',
      '',
      null,
      null,
      null,
      '',
      0,
      10,
      '');
    paqueteService.paquetes.asObservable().subscribe(value => {
      this.dummySource = value;
    });
    this.displayedColumns = ['casilla', 'clienteNombreApellido', 'numeroTracking', 'codigoExterno', 'ingreso', 'destino'];
  }


  ngOnInit(): void {
  }

  getPaquetes(
    cliente: string,
    numeroTracking: string,
    casilla: string,
    codigoExterno: string,
    codigoInterno: string,
    hasta: string,
    desde: string,
    idSucursal: number,
    vuelo: string,
    currentPage: number,
    perPage: number,
    sorting: string,
  ): void{
    this.paqueteService.getPaquetes(
      cliente,
      numeroTracking,
      casilla,
      codigoExterno,
      codigoInterno,
      hasta,
      desde,
      idSucursal,
      vuelo,
      currentPage,
      perPage,
      sorting);
  }

}
