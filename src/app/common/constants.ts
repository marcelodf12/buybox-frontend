export const PAGE_SIZE_OPTIONS: number[] = [10, 25, 50, 100];

export class MessagesConst {
  public static get(code: number): string{
    switch (code) {
      case 0: return 'Operación exitosa';

      case 2001: return 'Usuario creado. Se ha enviado un correo electrónico para confirmarción';
      case 2002: return 'No posee paquetes aún';
      case 2003: return 'Edición correcta';

      case 4001: return 'Parámetros no válidos';
      case 4002: return 'Faltan campos obligatorios';
      case 4003: return 'El correo electrónico ya ha sido utilizado por otro usuario';
      case 4004: return 'Recurso no encontrado';
      case 4005: return 'El correo proporcionado no existe';
      case 4006: return 'El paquete no existe';

      case 9999: return 'Ah ocurrido un error inesperado. Favor intente más tarde';
      case -1: return 'Usuario y/o Contraseña incorrecto';
      case -2: return 'No posee permisos para realizar esta operacion';
    }
    return null;
  }
}

export class PermisosConst {
  public static clientPermisos: string[] = ['CLIENT'];
  public static adminPermisos: string[] = [
    'LIST_PAQUETE',
    'ALTA_PAQUETE',
    'LIST_CLIENTE',
    'EDIT_CLIENTE',
    'DETAIL_PAQUETE',
    'LIST_SUCURSAL',
    'MOVE_PAQUETE'
  ];
}
