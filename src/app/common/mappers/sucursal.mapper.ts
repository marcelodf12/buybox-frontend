import {Injectable} from '@angular/core';
import {Sucursal} from '../models/configuration.model';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class SucursalMapper {

  public sucursalMap: Map<number, Sucursal>;

  constructor() {
    this.sucursalMap = new Map<number, Sucursal>();
  }

  public init(_sucursales: Sucursal[]): void{
    _sucursales.forEach(e => {
      this.sucursalMap.set(e.i, e);
    });
  }
}
