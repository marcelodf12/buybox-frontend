import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GeneralResponse} from '../common/models/general-response.model';
import {Pageable} from '../common/models/pageable.model';
import {PaqueteModel} from '../common/models/paquete.model';
import {environment} from '../../environments/environment';
import {NGXLogger} from 'ngx-logger';
import * as StringUtil from 'utils-string';
import * as moment from 'moment';
import {PaqueteImportModel} from '../common/models/paquete-import.model';



@Injectable({
  providedIn: 'root'
})
export class PaqueteService{

  private apiUrl: string = environment.apiUrl + 'api/v1/paquete';
  paquetes: BehaviorSubject<GeneralResponse<PaqueteModel[], Pageable>>
    = new BehaviorSubject<GeneralResponse<PaqueteModel[], Pageable>>(new GeneralResponse<PaqueteModel[], Pageable>());

  private cliente: string;
  private numeroTracking: string;
  private casilla: string;
  private codigoExterno: string;
  private codigoInterno: string;
  private hasta: string;
  private desde: string;
  private idSucursal: number;
  private vuelo: string;
  private actual: string;
  private destino: string;
  private perPage: number;

  constructor(
    private http: HttpClient,
    private logger: NGXLogger,
  ) {
    this.vuelo = '';
  }

  getPaquetes(
    currentPage: number,
    sorting: string,
  ): void {
    const headers: HttpHeaders = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('currentPage', String(currentPage));
    params = params.append('perPage', String(this.perPage));
    params = params.append('sorting', sorting);
    if (!!this.idSucursal) { params = params.append('idSucursal', String(this.idSucursal)); }
    else { params = params.append('idSucursal', ''); }
    params = params.append('hasta', this.hasta);
    params = params.append('desde', this.desde);
    params = params.append('casilla', this.casilla);
    params = params.append('vuelo', this.vuelo);
    params = params.append('actual', this.actual);
    params = params.append('destino', this.destino);
    params = params.append('numeroTracking', this.numeroTracking);
    params = params.append('codigoExterno', this.codigoExterno);
    params = params.append('codigoInterno', this.codigoInterno);
    params = params.append('cliente', this.cliente);
    this.http.get<GeneralResponse<Array<PaqueteModel>, Pageable>>(
      `${this.apiUrl}`, { headers, params }).subscribe(
        value => {
          this.paquetes.next(value);
        }, error => {
          this.paquetes.next(new GeneralResponse<PaqueteModel[], Pageable>());
      }
    );
  }

  uploadFile(form: FormData): Observable<GeneralResponse<Array<PaqueteImportModel>, any>> {
    const headers: HttpHeaders = new HttpHeaders();
    const params = new HttpParams();
    return this.http.post<GeneralResponse<Array<PaqueteImportModel>, any>>(
      `${this.apiUrl}/import`, form, { headers, params });
  }

  setFilter(
    _cliente: string,
    _numeroTracking: string,
    _casilla: string,
    _codigoExterno: string,
    _codigoInterno: string,
    _hasta: string,
    _desde: string,
    _idSucursal: number,
    _actual: string,
    _destino: string,
    _perPage?: number,
  ): void {
      const desdeStr: string = !!_desde ? moment(_desde, 'yyyy-MM-DDThh:mm:ss.sssZ').format('yyyy-MM-DD') : '';
      const hastaStr: string = !!_hasta ? moment(_hasta, 'yyyy-MM-DDThh:mm:ss.sssZ').format('yyyy-MM-DD') : '';
      this.cliente = StringUtil.trimToEmpty(_cliente);
      this.numeroTracking = StringUtil.trimToEmpty(_numeroTracking);
      this.casilla = StringUtil.trimToEmpty(_casilla);
      this.codigoExterno = StringUtil.trimToEmpty(_codigoExterno);
      this.codigoInterno = StringUtil.trimToEmpty(_codigoInterno);
      this.hasta = hastaStr;
      this.desde = desdeStr;
      this.idSucursal = _idSucursal;
      this.actual = StringUtil.trimToEmpty(_actual);
      this.destino = StringUtil.trimToEmpty(_destino);
      if (!!_perPage) {
        this.perPage = _perPage;
      }
  }

  setPageSize( _perPage: number): void{
    this.perPage = _perPage;
  }

  getPaquete(_track: string): Observable<GeneralResponse<PaqueteModel, Pageable>> {
    const headers: HttpHeaders = new HttpHeaders();
    return this.http.get<GeneralResponse<PaqueteModel, Pageable>>(
      `${this.apiUrl}/${_track}`, { headers });
  }

  moverPaquete(_idPaquete: number, _idSucursal: number): Observable<GeneralResponse<PaqueteModel, any>>{
    const headers: HttpHeaders = new HttpHeaders();
    const params = new HttpParams();
    return this.http.put<GeneralResponse<PaqueteModel, any>>(
      `${this.apiUrl}/${_idPaquete}/move/${_idSucursal}`, null, { headers, params });
  }
}
