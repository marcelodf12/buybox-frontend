import {Injectable} from '@angular/core';
import {Estado} from '../models/configuration.model';

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class ColorSnackbarMapper {

  public colorMap: Map<string, string>;

  constructor() {
    this.colorMap = new Map<string, string>();
    this.colorMap.set('success', 'snackbar-success');
    this.colorMap.set('error', 'snackbar-error');
    this.colorMap.set('secondary', 'snackbar-info');
    this.colorMap.set('warning', 'snackbar-warning');
    this.colorMap.set('danger', 'snackbar-error');
  }
}

