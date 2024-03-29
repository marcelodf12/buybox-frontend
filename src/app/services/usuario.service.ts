import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GeneralResponse} from '../common/models/general-response.model';
import {PaqueteModel} from '../common/models/paquete.model';
import {Pageable} from '../common/models/pageable.model';
import {NGXLogger} from 'ngx-logger';
import {ClienteModel} from '../common/models/cliente.model';


@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class UsuarioService {

  private apiUrl: string = environment.apiUrl + 'api/v1/usuario';

  constructor(
    private http: HttpClient,
    private logger: NGXLogger,
  ) {
  }

  getUsuarios(
    currentPage: number,
    perPage: number
  ): Promise<GeneralResponse<Array<ClienteModel>, Pageable>> {
    const headers: HttpHeaders = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('currentPage', String(currentPage));
    params = params.append('perPage', String(perPage));
    return this.http.get<GeneralResponse<Array<ClienteModel>, Pageable>>(
      `${this.apiUrl}`, { headers, params }).toPromise();
  }

  edit(usuario: ClienteModel): Promise<GeneralResponse<ClienteModel, any>> {
    const headers: HttpHeaders = new HttpHeaders();
    const params = new HttpParams();
    return this.http.put<GeneralResponse<ClienteModel, any>>(
      `${this.apiUrl}/${usuario.idUsuario}`, usuario, { headers, params }).toPromise();
  }

  nuevo(usuario: ClienteModel): Promise<GeneralResponse<ClienteModel, any>> {
    this.logger.debug(usuario);
    const headers: HttpHeaders = new HttpHeaders();
    const params = new HttpParams();
    return this.http.post<GeneralResponse<ClienteModel, any>>(
      `${this.apiUrl}`, usuario, { headers, params }).toPromise();
  }
}
