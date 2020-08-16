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
      '',
      '',
      null,
      '',
      0,
      10,
      '').subscribe(value => {
      this.dummySource = value.body;
    });
    this.displayedColumns = ['casilla', 'clienteNombreApellido', 'numeroTracking', 'codigoExterno', 'ingreso', 'destino'];
  }


  ngOnInit(): void {
  }

}
