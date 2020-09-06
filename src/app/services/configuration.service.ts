import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {NGXLogger} from 'ngx-logger';
import {BehaviorSubject} from 'rxjs';
import {ConfigurationModel} from '../common/models/configuration.model';
import {EstadoMapper} from '../common/mappers/estado.mapper';
import {GeneralResponse} from '../common/models/general-response.model';
import {environment} from '../../environments/environment';



@Injectable({
    providedIn: 'root'
})
// @ts-ignore
export class ConfigurationService {

    private apiUrl: string = environment.apiUrl + 'api/v1/commons';
    private headers: HttpHeaders = null;
    public config: BehaviorSubject<ConfigurationModel> = new BehaviorSubject<ConfigurationModel>(null);

    constructor(
        private http: HttpClient,
        private logger: NGXLogger,
        private estadoMapper: EstadoMapper,
    ) { }

    getConfig(): void {
        this.headers = new HttpHeaders().set('Content-Type', 'application/json');
        const params = new HttpParams();
        this.http.get<GeneralResponse<ConfigurationModel, any>>(`${this.apiUrl}`, {headers: this.headers, params})
            .subscribe(
                value => {
                    this.estadoMapper.init(value.body.estados);
                    this.config.next(value.body);
                });
    }

}
