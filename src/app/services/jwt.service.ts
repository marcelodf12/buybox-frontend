import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';


@Injectable({
    providedIn: 'root'
})
// @ts-ignore
export class JwtService {

    constructor(
        private logger: NGXLogger
    ) {
    }

    public isValidToken(token: string): boolean{
        try{
            const b64str = token.split('.')[1];
            const payload = JSON.parse(atob(b64str));
            if (payload.exp >= (new Date().getTime() + 1) / 1000) {
                return true;
            }
        }catch (e) {
            this.logger.error(e);
        }
        return false;
    }

  public getSubject(token: string): string{
    try{
      const b64str = token.split('.')[1];
      const payload = JSON.parse(atob(b64str));
      if (payload.exp >= (new Date().getTime() + 1) / 1000) {
        return payload.sub;
      }
    }catch (e) {
      this.logger.error(e);
    }
    return null;
  }

  public getPermisos(token: string): string[]{
    try{
      const b64str = token.split('.')[1];
      const payload = JSON.parse(atob(b64str));
      if (!!payload.permissions) {
        return payload.permissions.split('|');
      }
    }catch (e) {
      this.logger.error(e);
    }
    return [];
  }
}
