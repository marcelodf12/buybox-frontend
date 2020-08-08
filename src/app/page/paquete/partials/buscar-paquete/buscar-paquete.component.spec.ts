import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPaqueteComponent } from './buscar-paquete.component';

describe('BuscarPaqueteComponent', () => {
  let component: BuscarPaqueteComponent;
  let fixture: ComponentFixture<BuscarPaqueteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarPaqueteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarPaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
