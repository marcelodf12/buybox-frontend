import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ConfigurationService} from '../../../../services/configuration.service';
import {Segmento, Sucursal} from '../../../../common/models/configuration.model';
import {UsuarioService} from '../../../../services/usuario.service';
import {NGXLogger} from 'ngx-logger';
import {ClienteModel} from '../../../../common/models/cliente.model';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  public sucursales: Sucursal[];
  public segmentos: Segmento[];
  public usuario: ClienteModel;
  public roles: string[];
  public estados: Array<string> = ['Inactivo', 'Activo'];
  changePass = false;
  hide = true;
  title: string;
  nuevo: boolean;


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: [ClienteModel, string[], string, boolean],
    public config: ConfigurationService,
    private usuarioService: UsuarioService,
    private logger: NGXLogger
  ) {
    this.usuario = data[0];
    this.roles = data[1];
    this.title = data[2];
    this.nuevo = data[3];
    this.changePass = this.nuevo;
}

  ngOnInit(): void {
    this.config.config.asObservable().subscribe(c => {
      this.sucursales = c.sucursales;
      this.segmentos = c.segmentos;
    });
  }

  save(): void {
    this.logger.debug(this.usuario);
    if (!this.changePass && !this.nuevo) {
      this.usuario.pass = null;
    }
    if (this.nuevo){
      this.usuarioService.nuevo(this.usuario).then(r => {
        this.logger.debug(r);
      });
    }else {
      this.usuarioService.edit(this.usuario).then(r => {
        this.logger.debug(r);
      });
    }
  }
}
