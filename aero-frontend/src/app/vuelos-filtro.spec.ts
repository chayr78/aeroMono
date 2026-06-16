import { TestBed } from '@angular/core/testing';

import { VuelosFiltro } from './vuelos-filtro';

describe('VuelosFiltro', () => {
  let service: VuelosFiltro;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VuelosFiltro);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
