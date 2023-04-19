import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProdServComponent } from './crear-prod-serv.component';

describe('CrearProdServComponent', () => {
  let component: CrearProdServComponent;
  let fixture: ComponentFixture<CrearProdServComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearProdServComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProdServComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
