import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {NGXLogger} from 'ngx-logger';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {ReporteModel} from '../../common/models/reporte.model';
import {GeneralResponse} from '../../common/models/general-response.model';
import {ReporteService} from '../../services/reporte.service';
import {EstadoMapper} from '../../common/mappers/estado.mapper';
import {SucursalMapper} from '../../common/mappers/sucursal.mapper';
import {UtilsBuybox} from '../../common/utils-buybox';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  dimensiones: any[];
  agrupadores: any[];
  filtro: FormGroup;
  myChart: any;
  currentStartDate: string;
  currentEndDate: string;
  labels: string[];
  indexLabelsMap: Map<string, number>;
  days: number;
  utils: UtilsBuybox = new UtilsBuybox();

  constructor(
    private logger: NGXLogger,
    private fb: FormBuilder,
    private reporteService: ReporteService,
    public estadoMapper: EstadoMapper,
    private sucursalMapper: SucursalMapper,
  ) {
    this.filtro = this.fb.group({
      ingresoHasta: [null, [Validators.required], []],
      ingresoDesde: [null, [Validators.required], []],
      dimension: ['montoTotal', [Validators.required], []],
      agrupador: ['todos', [Validators.required], []]
    });
  }

  ngOnInit(): void {
    this.dimensiones = [
      {k: 'precio', v: 'Precio (USD)'},
      {k: 'peso', v: 'Peso (Kg)'},
      {k: 'volumen', v: 'Volumen (m3)'},
      {k: 'montoTotal', v: 'Monto Total (USD)'}
    ];
    this.agrupadores = [
      {k: 'todos', sEstado: null, sSegmento: null, v: 'No Dividir'},
      {k: 'estado', sEstado: null, sSegmento: null, v: 'Estados'},
      {k: 'segmento', sEstado: null, sSegmento: null, v: 'Segmento'},
    ];
    this.logger.debug('canvas');
  }

  graficar(): void {
    this.logger.debug('Graficar');
    const startDate = this.filtro.get('ingresoDesde').value;
    const endDate = this.filtro.get('ingresoHasta').value ;
    const dim = this.filtro.get('dimension').value;
    const agrupador = this.filtro.get('agrupador').value;
    this.getResult(startDate, endDate).then(
      result => {
        this.logger.debug('Graficando');
        this.utils = new UtilsBuybox();
        this.calcAgrupadores(result);
        this.currentStartDate = startDate;
        this.currentEndDate = endDate;
        this.labels = this.enumerateDaysBetweenDates(startDate, endDate);
        const canvas = document.getElementById('reportChart') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (this.myChart) { this.myChart.destroy(); }
        this.myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.labels,
            datasets: this.genDataSet(result, dim, agrupador)
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: 'Resumen de paquetes'
            },
            scales: {
              yAxes: [
                {
                  stacked: true,
                  ticks: {
                    beginAtZero: true
                  }
                }
              ],
              xAxes: [
                {
                  stacked: true
                }
              ]
            }
          }
        });
      }
    );
  }

  private enumerateDaysBetweenDates(startDate, endDate): string[]{
    this.logger.debug(`Desde: ${startDate}\nHasta: ${endDate}`);
    const date: string[] = [];
    this.indexLabelsMap = new Map();
    this.days = 0;
    while (moment(startDate).unix() <= moment(endDate).unix()){
      const dateAux = moment(startDate).format('YYYY-MM-DD');
      date.push(dateAux);
      // this.logger.debug(`indexLabelsMap put ${dateAux} -- ${this.days} =${JSON.stringify(this.indexLabelsMap)}`);
      this.indexLabelsMap.set(dateAux, this.days++);
      startDate = moment(startDate).add(1, 'days').format('YYYY-MM-DD');
    }
    // this.logger.debug(`indexLabelsMap=${JSON.stringify(this.indexLabelsMap)}`);
    return date;
  }

  private dimMapper(k: string): string{
    return this.dimensiones.filter(x => x.k === k)[0].v;
  }

  getResult(startDate, endDate): Promise<GeneralResponse<Array<ReporteModel>, any>> {
    return this.reporteService.getReporte(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'));
  }

  doAction(trigger: string): void {
    this.reporteService.getToken().then(response => {
      const startDate =  moment(this.currentStartDate).format('YYYY-MM-DD');
      const endDate = moment(this.currentEndDate).format('YYYY-MM-DD');
      this.logger.debug(response);
      const link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      const href = this.reporteService.getUrlReporteXLS(
        startDate,
        endDate,
        response.body
      );
      this.logger.debug(href);
      link.href = href;
      link.download = `Resumen ${startDate} al ${endDate}.xls`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  calcAgrupadores(result: GeneralResponse<ReporteModel[], any>): void {
    this.logger.debug('calcAgrupadores');
    const estados: Set<string> = new Set();
    const segmentos: Set<string> = new Set();
    result.body.forEach(r => {
      estados.add(r.estado);
      segmentos.add(r.segmento);
    });
    this.agrupadores = [
      {k: 'todos', sEstado: ['.*'], sSegmento: ['.*'], v: 'No Agrupar'},
      {k: 'estado', sEstado: [...estados], sSegmento: null, v: 'Estados'},
      {k: 'segmento', sEstado: null, sSegmento: [...segmentos], v: 'Segmento'},
    ];
  }

  genDataSet(result: GeneralResponse<ReporteModel[], any>, dim: string, agrupador: string): any[]{
    this.logger.debug('genDataSet');
    const agg: any = this.agrupadores.filter(x => x.k === agrupador)[0];
    let dataSets: any[] = agg.sEstado?.map(x => this.generateDataSetFilter(result, dim, x, null));
    if (!!!dataSets){
      dataSets = agg.sSegmento?.map(x => this.generateDataSetFilter(result, dim, null, x));
    }
    return dataSets;
  }


  generateDataSetFilter(result: GeneralResponse<ReporteModel[], any>, dim: string, sEstado: string, sSegmento: string): any{
    this.logger.debug('generateDataSetFilter');
    const res = {
      label: (sEstado == null && sSegmento == null) ? this.dimMapper(dim) : (sEstado == null ? sSegmento : sEstado),
      backgroundColor: this.utils.nextColor(),
      data:  result.body
      .filter(r => sEstado == null || r.estado.match(sEstado))
      .filter(r => sSegmento == null || r.segmento.match(sSegmento))
      .reduce((data, current) => {
        const i = this.indexLabelsMap.get(moment(current.fecha).format('YYYY-MM-DD'));
        data[i] += current[this.filtro.get('dimension').value];
        return data;
      }, new Array(this.days + 1).fill(0))
    };
    this.logger.debug(JSON.stringify(res));
    return res;
  }


}
