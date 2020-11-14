export class SucursalModel {
  idSucursal: number;
  nombre: string;
  rastreable: number;
  idEstadoDefecto?: number;
  editable: number;
  notificableLlegada: number;
  notificableFinal: number;
  mensajeAlCliente?: string;
  mensajeAlClienteFinal?: any;
  isFinal: number;
  isDelivery: number;
  mailDelivery: string;
}
