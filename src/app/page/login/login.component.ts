import {Component, OnInit, Output} from '@angular/core';
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
    //this.loginService.autenticar(this.username, this.password); // Esto hay que borrar
  }

  login(): void {
    this.loginService.autenticar(this.username, this.password);
  }
}
