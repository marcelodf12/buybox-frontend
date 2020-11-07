import {RastreoModel} from './rastreo.model';

export class PaqueteModel{
  idPaquete: number;
  numeroTracking: string;
  vuelo: string;
  peso: number;
  longitud: number;
  ancho: number;
  altura: number;
  volumen: number;
  precio: number;
  descripcion: string;
  autorizadoNombre: string;
  autorizadoDocumento: string;
  montoTotal: number;
  idCliente: number;
  clienteNombreApellido: string;
  codigoInterno: string;
  codigoExterno: string;
  idEstado: number;
  ingreso: Date;
  destino: string;
  idSucursalDestino: number;
  sucursalActual: string;
  idSucursalActual: number;
  casilla?: string;
  rastreo?: RastreoModel[];
  delivery?: number;
  lng?: number;
  lat?: number;
}
