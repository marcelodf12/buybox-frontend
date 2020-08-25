import {Component, OnInit, Output, AfterContentInit} from '@angular/core';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  showSpinner: boolean;
  hide: boolean;

  constructor(
    private loginService: LoginService
  ) {
    this.hide = true;
    this.showSpinner = false;

  }

  ngOnInit(): void {

  }

  login(): void {
    this.loginService.login(this.username, this.password);
  }

}
