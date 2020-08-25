import {Component, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {LoginService} from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  sideBarOpen = true;
  estaAutenticado: boolean;

  constructor(
    private logger: NGXLogger,
    private loginService: LoginService
  ) {
    loginService.estaAutenticadoSubject().subscribe((data) => {
      this.estaAutenticado = data;
    });
    loginService.checkLogin();
  }

  ngOnInit(): void { }


  sideBarToggler($event: any): void {
    this.logger.debug('sideBarToggler()');
    this.logger.debug($event);
    this.sideBarOpen = !this.sideBarOpen;
  }
}
