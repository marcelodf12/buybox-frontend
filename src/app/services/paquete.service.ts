import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GeneralResponse} from '../common/models/general-response.model';
import {Pageable} from '../common/models/pageable.model';
import {Paquete} from '../common/models/paquete.model';
import {environment} from '../../environments/environment';
import {NGXLogger} from 'ngx-logger';
import * as StringUtil from 'utils-string';
import * as moment from 'moment';
import has = Reflect.has;



@Injectable({
  providedIn: 'root'
})
export class PaqueteService{

  private apiUrl: string = environment.apiUrl + '/api/v1/paquete';
  headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU5Nzk2ODY2MywicGVybWlzc2lvbnMiOiJST0xFX0FETUlOIn0.aNKaCVeTwRHJujx63BKIVtDBBvbUoJJiy8ftbDqTTbecUOG77jnfUFcS5unegNjJbnve1JVGgOXlyphm7XVI4w');
  paquetes: BehaviorSubject<Paquete[]> = new BehaviorSubject<Paquete[]>([]);

  constructor(
    private http: HttpClient,
    private logger: NGXLogger,
  ) {

  }

  getPaquetes(
    cliente: string,
    numeroTracking: string,
    casilla: string,
    codigoExterno: string,
    codigoInterno: string,
    hasta: string,
    desde: string,
    idSucursal: number,
    vuelo: string,
    currentPage: number,
    perPage: number,
    sorting: string,
  ): void {
    let params = new HttpParams();
    const desdeStr: string = !!desde ? moment(desde, 'yyyy-MM-DDThh:mm:ss.sssZ').format('yyyy-MM-DD') : '';
    const hastaStr: string = !!hasta ? moment(hasta, 'yyyy-MM-DDThh:mm:ss.sssZ').format('yyyy-MM-DD') : '';
    this.logger.debug(desde);
    this.logger.debug(hasta);
    params = params.append('currentPage', String(currentPage));
    params = params.append('perPage', String(perPage));
    params = params.append('sorting', sorting);
    if (!!idSucursal) { params = params.append('idSucursal', String(idSucursal)); }
    else { params = params.append('idSucursal', ''); }
    params = params.append('hasta', hastaStr);
    params = params.append('desde', desdeStr);
    params = params.append('casilla', StringUtil.trimToEmpty(casilla));
    params = params.append('vuelo', StringUtil.trimToEmpty(vuelo));
    params = params.append('numeroTracking', StringUtil.trimToEmpty(numeroTracking));
    params = params.append('codigoExterno', StringUtil.trimToEmpty(codigoExterno));
    params = params.append('codigoInterno', StringUtil.trimToEmpty(codigoInterno));
    params = params.append('cliente', StringUtil.trimToEmpty(cliente));
    this.logger.debug(JSON.stringify(this.headers));
    this.http.get<GeneralResponse<Array<Paquete>, Pageable>>(
      `${this.apiUrl}`, { headers: this.headers, params }).subscribe(value => {
       this.paquetes.next(value.body);
    });
  }

}
