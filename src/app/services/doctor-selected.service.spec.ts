import {TestBed} from '@angular/core/testing';

import {DoctorSelectedService} from './doctor-selected.service';

describe('DoctorSelectedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctorSelectedService = TestBed.get(DoctorSelectedService);
    expect(service).toBeTruthy();
  });
});
