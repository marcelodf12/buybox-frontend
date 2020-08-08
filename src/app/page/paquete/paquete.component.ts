import { Component, OnInit } from '@angular/core';

import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

import { Producto } from '../../interface/producto.interface';
import {NGXLogger} from 'ngx-logger';
import {MatDialog} from '@angular/material/dialog';
import {ImportarPaquetesComponent} from './partials/importar-paquetes/importar-paquetes.component';

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.scss']
})
export class PaqueteComponent implements OnInit {

  faFileExcel: any = faFileExcel;

  constructor(
    private logger: NGXLogger,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
  }

  doAction(trigger: string): void {
    this.logger.debug('Ejecutando acción de botón FAB');
    if (trigger === 'excel'){
      this.dialog.open(ImportarPaquetesComponent,{
        closeOnNavigation: false,
        disableClose: true,
        minWidth: '80%'
      });
    }
  }
}
