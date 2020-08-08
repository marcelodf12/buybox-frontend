import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoPaqueteComponent } from './resultado-paquete.component';

describe('ResultadoPaqueteComponent', () => {
  let component: ResultadoPaqueteComponent;
  let fixture: ComponentFixture<ResultadoPaqueteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoPaqueteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
