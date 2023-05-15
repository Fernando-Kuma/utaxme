import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraIngresosComponent } from './barra-ingresos.component';

describe('BarraIngresosComponent', () => {
  let component: BarraIngresosComponent;
  let fixture: ComponentFixture<BarraIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraIngresosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
