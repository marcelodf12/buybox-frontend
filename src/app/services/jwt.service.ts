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
              if (payload.permissions.toString().indexOf('CLIENT') !== -1) {
                return true;
              }
            }
        }catch (e) {
            this.logger.error(e);
        }
        return false;
    }
}
