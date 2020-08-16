import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GeneralResponse} from '../common/models/general-response.model';
import {Pageable} from '../common/models/pageable.model';
import {Paquete} from '../common/models/paquete.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService{

  private apiUrl: string = environment.apiUrl + '/api/v1/paquete';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
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
  ): Observable<GeneralResponse<Array<Paquete>, Pageable>> {
    let params = new HttpParams();
    params = params.append('currentPage', String(currentPage));
    params = params.append('perPage', String(perPage));
    params = params.append('sorting', sorting);
    if (!!idSucursal) { params = params.append('idSucursal', String(idSucursal)); }
    else { params = params.append('idSucursal', ''); }
    params = params.append('hasta', hasta);
    params = params.append('desde', desde);
    params = params.append('casilla', casilla);
    params = params.append('vuelo', vuelo);
    params = params.append('numeroTracking', numeroTracking);
    params = params.append('codigoExterno', codigoExterno);
    params = params.append('codigoInterno', codigoInterno);
    params = params.append('cliente', cliente);
    return this.http.get<GeneralResponse<Array<Paquete>, Pageable>>(
      `${this.apiUrl}`, { headers: this.headers, params });
  }

}
