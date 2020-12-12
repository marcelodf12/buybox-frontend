import {Component, OnInit, ViewChild} from '@angular/core';
import {ClienteModel} from '../../common/models/cliente.model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {UsuarioService} from '../../services/usuario.service';
import {PAGE_SIZE_OPTIONS} from '../../common/constants';
import {MatTableDataSource} from '@angular/material/table';
import {NGXLogger} from 'ngx-logger';
import {EditarClienteComponent} from '../clientes/partials/editar-cliente/editar-cliente.component';
import {EditarUsuarioComponent} from './partials/editar-usuario/editar-usuario.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  dummySource: ClienteModel[];
  matdatasource: MatTableDataSource<ClienteModel>;
  displayedColumns: string[];
  roles: string[];
  public estados: Array<string> = ['Inactivo', 'Activo'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSize: any;

  pageNumber: any;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  total: number;

  constructor(
    private logger: NGXLogger,
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
  ) {
    this.pageSize = this.pageSizeOptions[0];
    this.matdatasource = new MatTableDataSource([]);
    this.displayedColumns = ['correo', 'clienteNombreApellido', 'roles', 'estado', 'acciones'];
    this.getPage();
  }

  ngOnInit(): void {
  }

  editar(cliente: ClienteModel): void {
    this.logger.debug(cliente);
    this.dialog.open(EditarUsuarioComponent, {
      data: [JSON.parse(JSON.stringify(cliente)), this.roles, cliente.correo, false],
      width: '600px',
    }).afterClosed().subscribe(value => {
      this.getPage();
    });
  }

  nuevo(): void {
    this.dialog.open(EditarUsuarioComponent, {
      data: [new ClienteModel(), this.roles, 'Nuevo Usuario', true],
      width: '600px',
    }).afterClosed().subscribe(value => {
      this.getPage();
    });
  }

  getPage(): void {
    this.usuarioService.getUsuarios(0, this.pageSize).then(value => {
      this.dummySource = value.body;
      // tslint:disable-next-line:no-string-literal
      this.roles = value.header.additionalParams['roles'].split(',');
      this.matdatasource.data = value.body;
      this.total = value.meta.totalResults;
      this.pageNumber = value.meta.currentPage;
    });
  }

  changePage($event: PageEvent): void {
    this.logger.debug('changePage');
    this.pageSize = $event.pageSize;
    this.usuarioService.getUsuarios($event.pageIndex, this.pageSize).then(value => {
      this.dummySource = value.body;
      this.matdatasource.data = value.body;
      this.total = value.meta.totalResults;
      this.pageNumber = value.meta.currentPage;
    });
    console.log($event);
  }


}
