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

  getToken(): Promise<GeneralResponse<string, any>> {
    const headers: HttpHeaders = new HttpHeaders();
    const params = new HttpParams();
    return this.http.get<GeneralResponse<string, any>>(
      `${this.apiUrl}/auth`, { headers, params }).toPromise();
  }

  getUrlReporteXLS(desde: string,
                   hasta: string,
                   token: string): string{
    return `${environment.apiUrl}public/downloads/reporte/paquetes/resumen.xls?desde=${desde}&hasta=${hasta}&token=${token}`;
  }

}
