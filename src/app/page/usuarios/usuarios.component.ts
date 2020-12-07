import {Component, OnInit, ViewChild} from '@angular/core';
import {ClienteModel} from '../../common/models/cliente.model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {UsuarioService} from '../../services/usuario.service';
import {PAGE_SIZE_OPTIONS} from '../../common/constants';
import {MatTableDataSource} from '@angular/material/table';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  dummySource: ClienteModel[];
  matdatasource: MatTableDataSource<ClienteModel>;
  displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSize: any;

  pageNumber: any;
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  total: number;

  constructor(
    private logger: NGXLogger,
    private usuarioService: UsuarioService
  ) {
    this.pageSize = this.pageSizeOptions[0];
    this.matdatasource = new MatTableDataSource([]);
    this.displayedColumns = ['correo', 'clienteNombreApellido', 'roles', 'acciones'];
    this.usuarioService.getUsuarios(0, this.pageSize).then(value => {
      this.dummySource = value.body;
      this.matdatasource.data = value.body;
      this.total = value.meta.totalResults;
      this.pageNumber = value.meta.currentPage;
    });
  }

  ngOnInit(): void {
  }

  editar(element: any): void {

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
