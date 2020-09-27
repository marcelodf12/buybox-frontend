import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Producto} from '../../../../interface/producto.interface';
import {NGXLogger} from 'ngx-logger';
import {PAGE_SIZE_OPTIONS} from '../../../../common/constants';
import {ClienteService} from '../../../../services/cliente.service';
import {ClienteModel} from '../../../../common/models/cliente.model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {EditarClienteComponent} from '../editar-cliente/editar-cliente.component';
import {SegmentoMapper} from '../../../../common/mappers/segmento.mapper';
import {Segmento} from '../../../../common/models/configuration.model';

@Component({
  selector: 'app-resultado-cliente',
  templateUrl: './resultado-cliente.component.html',
  styleUrls: ['./resultado-cliente.component.scss']
})
export class ResultadoClienteComponent implements OnInit, AfterViewInit  {

  dummySource: ClienteModel[];
  displayedColumns: string[];
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  matdatasource: MatTableDataSource<ClienteModel>;
  total: number;
  pageNumber: number;
  public segmentoMap: Map<number, Segmento>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSize: number;

  ngAfterViewInit(): void {
    // this.matdatasource.paginator = this.paginator;
  }

  constructor(
    private logger: NGXLogger,
    private clienteService: ClienteService,
    private dialog: MatDialog,
    public segmentoMapper: SegmentoMapper
  ) {
    this.pageSize = this.pageSizeOptions[0];
    this.matdatasource = new MatTableDataSource([]);
    this.clienteService.setFilter(
      '',
      '',
      '',
      '',
      this.pageSize);
    this.clienteService.getClientes(
      0,
      '');
    clienteService.clientes.asObservable().subscribe(value => {
      this.segmentoMap = segmentoMapper.segmentoMap;
      if (!!value.body) {
        this.dummySource = value.body;
        this.matdatasource.data = value.body;
        this.total = value.meta.totalResults;
        this.pageNumber = value.meta.currentPage;
        // this.pageNumber = value.meta.currentPage;
        // this.paginator.length = value.meta.totalResults;
        // this.dummySource = this.matdatasource.filteredData;
      }
    });
    this.displayedColumns = ['casilla', 'clienteNombreApellido', 'cedula', 'correo', 'segmento', 'acciones'];
  }


  ngOnInit(): void {
  }

  changePage($event: PageEvent): void {
    this.logger.debug('changePage');
    this.clienteService.setPageSize($event.pageSize);
    this.clienteService.getClientes(
      $event.pageIndex,
      '');
    console.log($event);
  }

  editar(cliente: ClienteModel): void {
    this.logger.debug(cliente);
    this.dialog.open(EditarClienteComponent, {
      data: JSON.parse(JSON.stringify(cliente)),
      width: '600px',
    });
  }
}
