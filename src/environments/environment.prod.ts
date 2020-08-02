import {NgxLoggerLevel} from 'ngx-logger';

export const environment = {
  production: true,
  apiUrl: 'http://api.myservice.com/api/', // Reemplazar con API remoto
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR
};
