import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarPaquetesComponent } from './importar-paquetes.component';

describe('ImportarPaquetesComponent', () => {
  let component: ImportarPaquetesComponent;
  let fixture: ComponentFixture<ImportarPaquetesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportarPaquetesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportarPaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
