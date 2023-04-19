import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarCfdiComponent } from './generar-cfdi.component';

describe('GenerarCfdiComponent', () => {
  let component: GenerarCfdiComponent;
  let fixture: ComponentFixture<GenerarCfdiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarCfdiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarCfdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
