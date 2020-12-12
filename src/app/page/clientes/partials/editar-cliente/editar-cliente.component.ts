import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ClienteModel} from '../../../../common/models/cliente.model';
import {ConfigurationService} from '../../../../services/configuration.service';
import {Segmento, Sucursal} from '../../../../common/models/configuration.model';
import {ClienteService} from '../../../../services/cliente.service';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {

  public sucursales: Sucursal[];
  public segmentos: Segmento[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public cliente: ClienteModel,
    public config: ConfigurationService,
    private clienteService: ClienteService,
    private logger: NGXLogger,
  ) { }

  ngOnInit(): void {
    this.config.config.asObservable().subscribe(c => {
      this.sucursales = c.sucursales;
      this.segmentos = c.segmentos;
    });
  }

  save(): void {
    this.logger.debug(this.cliente);
    this.clienteService.edit(this.cliente).subscribe(r => {
      this.logger.debug(r);
      this.clienteService.refresh();
    });
  }
}
