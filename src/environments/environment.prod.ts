import {NgxLoggerLevel} from 'ngx-logger';

export const environment = {
  production: true,
  apiUrl: 'https://track.mfranco.dev/tracksystem/', // Reemplazar con API remoto
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR
};
