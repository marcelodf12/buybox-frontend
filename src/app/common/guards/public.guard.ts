import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {JwtService} from '../../services/jwt.service';

@Injectable({
    providedIn: 'root'
})
// @ts-ignore
export class PublicGuard implements CanActivate {
    constructor(
        private router: Router,
        private jwtService: JwtService
    ) {}

    canActivate(): boolean {
        const token: string = localStorage.getItem('Authorization');
        if (!!token) {
            this.router.navigate(['/']);
            return !this.jwtService.isValidToken(token);
        }
        return true;
    }
}
