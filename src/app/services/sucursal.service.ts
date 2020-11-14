import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';
import {environment} from '../../environments/environment';
import {GeneralResponse} from '../common/models/general-response.model';
import {SucursalModel} from '../common/models/sucursal.model';
import {ClienteModel} from '../common/models/cliente.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class SucursalService {

  private apiUrl: string = environment.apiUrl + 'api/v1/sucursal';

  constructor(
    private http: HttpClient,
    private logger: NGXLogger,
  ) {

  }

  getSucursales(): Promise<GeneralResponse<Array<SucursalModel>, null>>{
    const params = new HttpParams();
    const headers: HttpHeaders = new HttpHeaders();
    return this.http.get<GeneralResponse<Array<SucursalModel>, null>>(
      `${this.apiUrl}`, { headers, params }).toPromise();
  }

  edit(_sucursal: SucursalModel): Promise<GeneralResponse<SucursalModel, any>>  {
    const headers: HttpHeaders = new HttpHeaders();
    const params = new HttpParams();
    return this.http.put<GeneralResponse<SucursalModel, any>>(
      `${this.apiUrl}`, _sucursal, { headers, params }).toPromise();
  }

}
