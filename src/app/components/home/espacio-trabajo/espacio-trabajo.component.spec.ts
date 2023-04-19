import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacioTrabajoComponent } from './espacio-trabajo.component';

describe('EspacioTrabajoComponent', () => {
  let component: EspacioTrabajoComponent;
  let fixture: ComponentFixture<EspacioTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspacioTrabajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspacioTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
