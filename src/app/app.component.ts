import {Component, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  sideBarOpen = true;

  constructor(private logger: NGXLogger) { }

  ngOnInit(): void { }


  sideBarToggler($event: any): void {
    this.logger.debug('sideBarToggler()');
    this.logger.debug($event);
    this.sideBarOpen = !this.sideBarOpen;
  }
}
