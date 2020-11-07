import { Component, OnInit } from '@angular/core';
import {ConfigurationService} from '../../services/configuration.service';
import {NGXLogger} from 'ngx-logger';
import {Estado, Sucursal} from '../../common/models/configuration.model';
import {PaqueteModel} from '../../common/models/paquete.model';
import {EstadoMapper} from '../../common/mappers/estado.mapper';
import {PaqueteService} from '../../services/paquete.service';
import {RastreoModel} from '../../common/models/rastreo.model';
import {SucursalMapper} from '../../common/mappers/sucursal.mapper';
import {MessagesConst} from '../../common/constants';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ColorSnackbarMapper} from '../../common/mappers/color-snackbar.mapper';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.scss']
})
export class RecepcionComponent implements OnInit {
  idSucursal: number;
  sucursales: Sucursal[];
  numeroRastreo: string;
  paquete: PaqueteModel;
  estadosMap: Map<number, Estado>;
  sucursalMap: Map<number, Sucursal>;
  estado: string;
  montoTotal: number;
  dummySource: RastreoModel[];
  displayedColumns: string[];
  notificacionTransporte: string;
  notificacionFinal: string;
  cargando: boolean;

  constructor(
    public config: ConfigurationService,
    public estadoMapper: EstadoMapper,
    private sucursalMapper: SucursalMapper,
    private paqueteService: PaqueteService,
    private snackBar: MatSnackBar,
    private colorSnackbarMapper: ColorSnackbarMapper,
    private logger: NGXLogger,
    private route: ActivatedRoute,
  ) {
    this.paquete = new PaqueteModel();
    this.cargando = false;
  }

  ngOnInit(): void {
    this.config.config.asObservable().subscribe(c => {
       this.sucursales = c.sucursales;
       this.sucursalMap = this.sucursalMapper.sucursalMap;
    });
    this.estadosMap = this.estadoMapper.estadosMap;
    this.displayedColumns = ['usuario', 'fechaHora', 'sucursal'];
    this.dummySource = [];
    if (!!this.route.snapshot.params.track){
      this.numeroRastreo = this.route.snapshot.params.track;
      this.cargarPaquete();
    }
  }

  find($event: KeyboardEvent): void{
    if ($event.key === 'Enter') {
      this.cargarPaquete();
    }
  }

  cargarPaquete(): void {
    this.estado = '';
    this.montoTotal = null;
    this.paquete = new PaqueteModel();
    this.paqueteService.getPaquete(this.numeroRastreo).subscribe(
      next => {
        this.paquete = next.body;
        const estadoObj = this.estadosMap.get(this.paquete.idEstado);
        this.estado = !!estadoObj ? estadoObj.e : this.paquete.idEstado + '';
        this.montoTotal = this.paquete.montoTotal / 100;
        this.dummySource = this.paquete.rastreo.sort((a, b) => new Date(a.fechaHora).getTime() - new Date(b.fechaHora).getTime());
        this.setNotificacion();
      },
      error => {
        this.paquete = new PaqueteModel();
        this.dummySource = [];
      }
    );
  }

  setNotificacion(): void{
    this.cargando = false;
    const sucursal: Sucursal = this.sucursalMap.get(this.idSucursal);
    if (!!sucursal && !!this.paquete && !!this.paquete.idSucursalDestino) {
      if (this.idSucursal === this.paquete.idSucursalDestino && sucursal.bmf === 1) {
        this.notificacionFinal = this.replaceTextNotificacion(sucursal.mf, sucursal);
        this.notificacionTransporte = '';
      }else if (sucursal.bm === 1 ){
        this.notificacionTransporte = this.replaceTextNotificacion(sucursal.m, sucursal);
        this.notificacionFinal = '';
      }
    }else{
      this.notificacionFinal = '';
      this.notificacionTransporte = '';
    }
  }

  replaceTextNotificacion(text: string, sucursalEntity: Sucursal): string{
    text = text.replace('##SUCURSAL##', sucursalEntity.n);
    text = text.replace('##RASTREO##', this.paquete.numeroTracking);
    text = text.replace('##DESCRIPCION##', this.paquete.descripcion);
    text = text.replace('##PESO##', (this.paquete.peso / 1000).toFixed(2));
    text = text.replace('##PRECIO##', (this.paquete.montoTotal / 100).toFixed(2));
    return text;
  }

  mover(): void {
    this.cargando = true;
    this.logger.debug(`paquete.idSucursalActual=${this.paquete.idSucursalActual} - idSucursal=${this.idSucursal}`);
    if (this.paquete.idSucursalActual !== this.idSucursal){
      this.logger.debug('Mover paquete');
      this.paqueteService.moverPaquete(this.paquete.idPaquete, this.idSucursal).subscribe(resp => {
        this.logger.debug(resp);
        this.cargarPaquete();
        this.cargando = false;
      });
    }else if (!!!this.idSucursal){
      this.logger.debug('No se selecciono la sucursal');
      this.snackBar.open(MessagesConst.get(-4), null, {
        duration: 2000,
        panelClass: [this.colorSnackbarMapper.colorMap.get('error')]
      });
    }else{
      this.logger.debug('No se puede mover el paquete');
      this.snackBar.open(MessagesConst.get(-3), null, {
        duration: 2000,
        panelClass: [this.colorSnackbarMapper.colorMap.get('error')]
      });
    }

  }
}
