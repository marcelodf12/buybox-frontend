import { Component, OnInit } from '@angular/core';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import {Producto} from '../../../../interface/producto.interface';

@Component({
  selector: 'app-importar-paquetes',
  templateUrl: './importar-paquetes.component.html',
  styleUrls: ['./importar-paquetes.component.scss']
})
export class ImportarPaquetesComponent implements OnInit {
  dummySource: Producto[];
  displayedColumns: string[];
  faFileExcel: any = faFileExcel;
  archivo: any;

  constructor() {
    this.displayedColumns = ['casilla', 'trackPaquete', 'trackProveedor', 'estadoImportado'];
    this.dummySource = [
      { casilla: 'BYB0001', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', estadoImportado: 0},
      { casilla: 'BYB0002', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', estadoImportado: -1},
      { casilla: 'BYB0003', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', estadoImportado: 1},
      { casilla: 'BYB0010', cliente: 'string', trackPaquete: 'string', trackProveedor: 'string', estadoImportado: 0}
    ];
    this.dummySource = [];
  }

  ngOnInit(): void {
  }

}
