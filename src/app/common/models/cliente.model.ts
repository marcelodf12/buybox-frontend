export class ClienteModel {
    idUsuario: number;
    nombre: string;
    apellido: string;
    correo: string;
    bloqueadoHasta?: any;
    activo: number;
    intentosFallidos: number;
    linkDeRecuperacion?: any;
    linkFechaVencimiento: Date;
    pass?: any;
    ruc?: any;
    razonSocial?: any;
    direccion?: any;
    celular?: any;
    casilla: string;
    idSucursal?: number;
    idSegmento?: number;
}
