export const PAGE_SIZE_OPTIONS: number[] = [5, 10, 20, 50];

export class MessagesConst {
  public static get(code: number): string{
    switch (code) {
      case 0: return 'Operación exitosa';

      case 2001: return 'Usuario creado. Se ha enviado un correo electrónico para confirmarción';
      case 2002: return 'No posee paquetes aún';

      case 4001: return 'Parámetros no válidos';
      case 4002: return 'Faltan campos obligatorios';
      case 4003: return 'El correo electrónico ya ha sido utilizado por otro usuario';
      case 4004: return 'Recurso no encontrado';

      case 9999: return 'Ah ocurrido un error inesperado. Favor intente más tarde';
      case -1: return 'Usuario y/o Contraseña incorrecto';
    }
    return null;
  }
}
