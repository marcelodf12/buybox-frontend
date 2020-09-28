import { Component, OnInit } from '@angular/core';
import {ConfigurationService} from '../../services/configuration.service';
import {ClienteService} from '../../services/cliente.service';
import {NGXLogger} from 'ngx-logger';
import {Estado, Sucursal} from '../../common/models/configuration.model';
import {Paquete} from '../../common/models/paquete.model';
import {EstadoMapper} from '../../common/mappers/estado.mapper';
import {PaqueteService} from '../../services/paquete.service';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.scss']
})
export class RecepcionComponent implements OnInit {
  idSucursal: number;
  sucursales: Sucursal[];
  numeroRastreo: string;
  paquete: Paquete;
  estadosMap: Map<number, Estado>;
  estado: string;
  montoTotal: number;

  constructor(
    public config: ConfigurationService,
    public estadoMapper: EstadoMapper,
    private paqueteService: PaqueteService,
    private logger: NGXLogger
  ) {
    this.paquete = new Paquete();
  }

  ngOnInit(): void {
    this.config.config.asObservable().subscribe(c => {
        this.sucursales = c.sucursales;
    });
    this.estadosMap = this.estadoMapper.estadosMap;
  }

  find($event: KeyboardEvent): void{
    if ($event.key === 'Enter') {
      this.estado = '';
      this.montoTotal = null;
      this.paquete = new Paquete();
      this.paqueteService.getPaquete(this.numeroRastreo).subscribe(
        next => {
          this.paquete = next.body;
          const estadoObj = this.estadosMap.get(this.paquete.idEstado);
          this.estado = !!estadoObj ? estadoObj.e : this.paquete.idEstado + '';
          this.montoTotal = this.paquete.montoTotal / 100;
        },
        error => {
          this.paquete = new Paquete();
        }
      );
    }
  }

}
