import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {NGXLogger} from 'ngx-logger';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {ReporteModel} from '../../common/models/reporte.model';
import {of} from 'rxjs';
import {GeneralResponse} from '../../common/models/general-response.model';
import {ReporteService} from '../../services/reporte.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  dimensiones: any[];
  filtro: FormGroup;
  myChart: any;

  constructor(
    private logger: NGXLogger,
    private fb: FormBuilder,
    private reporteService: ReporteService,
  ) {
    this.filtro = this.fb.group({
      ingresoHasta: [null, [Validators.required], []],
      ingresoDesde: [null, [Validators.required], []],
      dimension: [null, [Validators.required], []]
    });
  }

  ngOnInit(): void {
    this.dimensiones = [
      { k: 'precio', v: 'Precio'},
      { k: 'peso', v: 'Peso'},
      { k: 'volumen', v: 'Volumen'}
    ];
    this.logger.debug('canvas');
  }

  graficar(): void {
    this.logger.debug('Graficar');
    const startDate = this.filtro.get('ingresoDesde').value;
    const endDate = this.filtro.get('ingresoHasta').value ;
    const dim = this.filtro.get('dimension').value;
    this.getResult(startDate, endDate).then(
      result => {
        this.logger.debug('Graficando');
        const canvas = document.getElementById('reportChart') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (this.myChart) { this.myChart.destroy(); };
        this.myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.enumerateDaysBetweenDates(startDate, endDate),
            datasets: [{
              label: dim,
              data:  Array.from(result.body
                .reduce((mapa, current) => {
                  const pre: ReporteModel = mapa.get(current.fecha);
                  if (pre) {
                    pre.peso += current.peso;
                    pre.volumen += current.volumen;
                    pre.precio += current.precio;
                  } else {
                    mapa.set(current.fecha, current);
                  }
                  return mapa;
                }, new Map<Date, ReporteModel>())
                .values())
                .map(r => {
                return {x: r.fecha, y: r[this.filtro.get('dimension').value]};
              }),
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      }
    );
  }

  private enumerateDaysBetweenDates(startDate, endDate): string[]{
    this.logger.debug(`Desde: ${startDate}\nHasta: ${endDate}`);
    const date: string[] = [];
    while (moment(startDate).unix() <= moment(endDate).unix()){
      // this.logger.debug(moment(startDate));
      date.push(moment(startDate).format('YYYY-MM-DD'));
      startDate = moment(startDate).add(1, 'days').format('YYYY-MM-DD');
    }
    return date;
  }

  getResult(startDate, endDate): Promise<GeneralResponse<Array<ReporteModel>, any>> {
    return this.reporteService.getReporte(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'));
  }
}
