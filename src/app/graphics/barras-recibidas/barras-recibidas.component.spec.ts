import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrasRecibidasComponent } from './barras-recibidas.component';

describe('BarrasRecibidasComponent', () => {
  let component: BarrasRecibidasComponent;
  let fixture: ComponentFixture<BarrasRecibidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarrasRecibidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarrasRecibidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
