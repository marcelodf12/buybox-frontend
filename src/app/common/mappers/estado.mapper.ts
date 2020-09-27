import {Injectable} from '@angular/core';
import {Estado} from '../models/configuration.model';

@Injectable({
    providedIn: 'root'
})
// @ts-ignore
export class EstadoMapper {

    public estadosMap: Map<number, Estado>;

    constructor() {
        this.estadosMap = new Map<number, Estado>();
    }

    public init(_estados: Estado[]): void{
        _estados.forEach(e => {
            this.estadosMap.set(e.i, e);
        });
    }
}
