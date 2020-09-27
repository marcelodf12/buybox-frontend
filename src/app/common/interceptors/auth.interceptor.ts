import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {NGXLogger} from 'ngx-logger';
import {GeneralResponse} from '../models/general-response.model';
import {LoginService} from '../../services/login.service';
import {MessagesConst} from '../constants';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ColorSnackbarMapper} from '../mappers/color-snackbar.mapper';



@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private logger: NGXLogger,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private colorSnackbarMapper: ColorSnackbarMapper
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('Authorization');
    let request;
    if (!token) {
      request = req;
    }
    request = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next.handle(request).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          this.handleError(evt.status, evt.body);
          if (!!evt.body && evt.status === 200){
            this.logger.debug( 'SUCCESS REQUEST' );
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            this.handleError(err.status, err.error);
            if (err.status === 401 && err.error.path === '/buybox-backend/login'){
              this.presentToast(-1, 'danger');
            }
          } catch ( e ) {
            this.logger.debug('Try Catch');
            this.logger.debug(e);
          }
        }
        return of(err);
      })
    );;
  }

  private handleError(status: number, response: GeneralResponse<any, any>): void{
    this.logger.debug('Status code=' + status);
    if (status === 403){
      localStorage.removeItem('Authorization');
      this.loginService.salir();
    }
    if (!!response && !!response.header && response.header.show && response.header.type === 'toast'){
      this.presentToast(response.header.code, response.header.level);
    }
  }

  private presentToast(code: number, color: string): void {
    this.snackBar.open(MessagesConst.get(code), null, {
      duration: 2000,
      panelClass: [this.colorSnackbarMapper.colorMap.get(color)]
    });
  }

}
