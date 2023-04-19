import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesFrecuentesComponent } from './clientes-frecuentes.component';

describe('ClientesFrecuentesComponent', () => {
  let component: ClientesFrecuentesComponent;
  let fixture: ComponentFixture<ClientesFrecuentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesFrecuentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesFrecuentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
