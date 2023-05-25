import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCertificadoComponent } from './agregar-certificado.component';

describe('AgregarCertificadoComponent', () => {
  let component: AgregarCertificadoComponent;
  let fixture: ComponentFixture<AgregarCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCertificadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
