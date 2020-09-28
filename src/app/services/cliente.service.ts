import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {GeneralResponse} from '../common/models/general-response.model';
import {Pageable} from '../common/models/pageable.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';
import * as StringUtil from 'utils-string';
import {ClienteModel} from '../common/models/cliente.model';
import {PaqueteImportModel} from '../common/models/paquete-import.model';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class ClienteService {
  private apiUrl: string = environment.apiUrl + 'api/v1/cliente';
  clientes: BehaviorSubject<GeneralResponse<ClienteModel[], Pageable>>
    = new BehaviorSubject<GeneralResponse<ClienteModel[], Pageable>>(new GeneralResponse<ClienteModel[], Pageable>());

  private cliente: string;
  private casilla: string;
  private cedula: string;
  private correo: string;
  private perPage: number;
  private lastCurrentPage: number;
  private lastSorting: string;

  constructor(
    private http: HttpClient,
    private logger: NGXLogger,
  ) {

  }

  getClientes(
    currentPage: number,
    sorting: string,
  ): void {
    this.lastCurrentPage = currentPage;
    this.lastSorting = sorting;
    const headers: HttpHeaders = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('currentPage', String(currentPage));
    params = params.append('perPage', String(this.perPage));
    params = params.append('sorting', sorting);
    params = params.append('casilla', this.casilla);
    params = params.append('cedula', this.cedula);
    params = params.append('correo', this.correo);
    params = params.append('cliente', this.cliente);
    this.http.get<GeneralResponse<Array<ClienteModel>, Pageable>>(
      `${this.apiUrl}`, { headers, params }).subscribe(
        value => {
              this.clientes.next(value);
        },
        error => {
            this.clientes.next(new GeneralResponse<ClienteModel[], Pageable>());
        }
    );
  }

  setFilter(
    _cliente: string,
    _casilla: string,
    _correo: string,
    _cedula: string,
    _perPage?: number,
  ): void {
    this.cliente = StringUtil.trimToEmpty(_cliente);
    this.casilla = StringUtil.trimToEmpty(_casilla);
    this.cedula = StringUtil.trimToEmpty(_cedula);
    this.correo = StringUtil.trimToEmpty(_correo);
    if (!!_perPage) {
      this.perPage = _perPage;
    }
  }

  refresh(): void {
    this.getClientes(this.lastCurrentPage, this.lastSorting);
  }

  setPageSize( _perPage: number): void{
    this.perPage = _perPage;
  }

  edit(_client: ClienteModel): Observable<GeneralResponse<ClienteModel, any>>  {
    const headers: HttpHeaders = new HttpHeaders();
    const params = new HttpParams();
    return this.http.put<GeneralResponse<ClienteModel, any>>(
      `${this.apiUrl}`, _client, { headers, params });
  }

}
