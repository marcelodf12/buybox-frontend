import {Injectable} from '@angular/core';
import {Segmento} from '../models/configuration.model';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class SegmentoMapper {

  public segmentoMap: Map<number, Segmento>;

  constructor() {
    this.segmentoMap = new Map<number, Segmento>();
  }

  public init(_segmentos: Segmento[]): void{
    _segmentos.forEach(e => {
      this.segmentoMap.set(e.i, e);
    });
  }
}
