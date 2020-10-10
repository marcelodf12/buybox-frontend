import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Producto} from '../../../../interface/producto.interface';
import {NGXLogger} from 'ngx-logger';
import {PAGE_SIZE_OPTIONS} from '../../../../common/constants';
import {PaqueteService} from '../../../../services/paquete.service';
import {PaqueteModel} from '../../../../common/models/paquete.model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-resultado-paquete',
  templateUrl: './resultado-paquete.component.html',
  styleUrls: ['./resultado-paquete.component.scss']
})
export class ResultadoPaqueteComponent implements OnInit, AfterViewInit  {

  dummySource: PaqueteModel[];
  displayedColumns: string[];
  pageSizeOptions: number[] = PAGE_SIZE_OPTIONS;
  matdatasource: MatTableDataSource<PaqueteModel>;
  total: number;
  pageNumber: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSize: number;

  ngAfterViewInit(): void {
    // this.matdatasource.paginator = this.paginator;
  }

  constructor(
    private logger: NGXLogger,
    private paqueteService: PaqueteService,
  ) {
    this.pageSize = this.pageSizeOptions[0];
    this.matdatasource = new MatTableDataSource([]);
    this.paqueteService.setFilter(
      '',
      '',
      '',
      '',
      '',
      null,
      null,
      null,
      '',
      '',
      this.pageSize);
    this.paqueteService.getPaquetes(
      0,
      '');
    paqueteService.paquetes.asObservable().subscribe(value => {
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
    this.displayedColumns = ['casilla', 'clienteNombreApellido', 'numeroTracking', 'ingreso', 'actual', 'destino'];
  }


  ngOnInit(): void {
  }

  changePage($event: PageEvent): void {
    this.logger.debug('changePage');
    this.paqueteService.setPageSize($event.pageSize);
    this.paqueteService.getPaquetes(
      $event.pageIndex,
      '');
    console.log($event);
  }
}
