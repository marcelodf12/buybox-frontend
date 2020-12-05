import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GeneralResponse} from '../common/models/general-response.model';
import {ReporteModel} from '../common/models/reporte.model';
import {NGXLogger} from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class ReporteService {

  private apiUrl: string = environment.apiUrl + 'api/v1/reporte';

  constructor(
    private http: HttpClient,
    private logger: NGXLogger,
  ) {
  }

  getReporte(
    desde: string,
    hasta: string,
  ): Promise<GeneralResponse<Array<ReporteModel>, any>> {
    const headers: HttpHeaders = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('hasta', hasta);
    params = params.append('desde', desde);
    return this.http.get<GeneralResponse<Array<ReporteModel>, any>>(
      `${this.apiUrl}`, { headers, params }).toPromise();
  }

}
