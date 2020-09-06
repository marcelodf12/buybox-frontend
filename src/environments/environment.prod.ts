import {NgxLoggerLevel} from 'ngx-logger';

export const environment = {
  production: true,
  apiUrl: 'https://admin.buybox.com.py/buybox-backend/', // Reemplazar con API remoto
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR
};
