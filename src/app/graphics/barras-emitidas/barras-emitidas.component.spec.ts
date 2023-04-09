import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrasEmitidasComponent } from './barras-emitidas.component';

describe('BarrasEmitidasComponent', () => {
  let component: BarrasEmitidasComponent;
  let fixture: ComponentFixture<BarrasEmitidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarrasEmitidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarrasEmitidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
