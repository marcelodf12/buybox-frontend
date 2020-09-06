import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {NGXLogger} from 'ngx-logger';
import {GeneralResponse} from '../models/general-response.model';
import {LoginService} from '../../services/login.service';



@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private logger: NGXLogger,
    private loginService: LoginService,
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

  private async presentToast(code: number, color: string) {
    /*const toast = await this.toastController.create({
      message: MessagesConst.get(code),
      color: color,
      duration: 3000
    });
    await toast.present();*/
  }

}
