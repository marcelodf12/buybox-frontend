import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(
    private logger: NGXLogger,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  toggleSideBar(): void {
    this.logger.debug('toggleSideBar() = Toogle Side Bar exec');
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  salir(): void {
    this.loginService.salir();
  }
}
