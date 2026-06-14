import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reservacion } from './reservacion';

describe('Reservacion', () => {
  let component: Reservacion;
  let fixture: ComponentFixture<Reservacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reservacion],
    }).compileComponents();

    fixture = TestBed.createComponent(Reservacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
