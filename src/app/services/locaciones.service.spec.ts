/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocacionesService } from './locaciones.service';

describe('Service: Locaciones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocacionesService]
    });
  });

  it('should ...', inject([LocacionesService], (service: LocacionesService) => {
    expect(service).toBeTruthy();
  }));
});
