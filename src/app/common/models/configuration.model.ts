export class ConfigurationModel {
    estados: Estado[];
    sucursales: Sucursal[];
    ciudades: Ciudad[];
    barrios?: Barrio[];
    departamentos: Departamento[];
    categorias: Categoria[];
    etiquestas: Etiqueta[];
    segmentos: Segmento[];
}

export interface Estado {
    i: number;
    s: string;
    e: string;
    c: string;
}

export interface Sucursal {
    i: number;
    n: string;
    iB?: any;
    lt: number;
    ln: number;
}

export interface Ciudad {
    i: number;
    n: string;
    iD: number;
}

export interface Barrio {
    i: number;
    n: string;
    iC: number;
}

export interface Departamento {
    i: number;
    n: string;
}

export interface Segmento {
  i: number;
  n: string;
}

export interface Categoria {
    i: number;
    n: string;
}

export interface Etiqueta {
    k: string;
    v: string;
    c: string;
}





