import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaBarComponent } from './prueba-bar.component';

describe('PruebaBarComponent', () => {
  let component: PruebaBarComponent;
  let fixture: ComponentFixture<PruebaBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebaBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
