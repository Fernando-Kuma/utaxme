import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VelocimetroComponent } from './velocimetro.component';

describe('VelocimetroComponent', () => {
  let component: VelocimetroComponent;
  let fixture: ComponentFixture<VelocimetroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VelocimetroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VelocimetroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
