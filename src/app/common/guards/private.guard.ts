import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {JwtService} from '../../services/jwt.service';
import {ConfigurationService} from '../../services/configuration.service';
import {NGXLogger} from 'ngx-logger';
import {LoginService} from '../../services/login.service';


@Injectable({
    providedIn: 'root'
})
// @ts-ignore
export class PrivateGuard implements CanActivate {
    constructor(
        private router: Router,
        private jwtService: JwtService,
        private configurationService: ConfigurationService,
        private loginService: LoginService,
        private logger: NGXLogger
    ) {}

    canActivate(): boolean {
        this.logger.debug('Private Guard');
        const token: string = localStorage.getItem('Authorization');
        if (!!token) {
            const isValid: boolean = this.jwtService.isValidToken(token);
            if (isValid) {
              this.configurationService.getConfig();
            } else {
              this.loginService.salir();
            }
            this.logger.debug('isValid' + isValid);
            return isValid;
        }
        return false;
    }
}
