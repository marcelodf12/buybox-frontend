export interface Producto {
  casilla: string;
  cliente?: string;
  trackPaquete: string;
  trackProveedor: string;
  ingreso?: string;
  destino?: string;
  estadoImportado?: number;
}
