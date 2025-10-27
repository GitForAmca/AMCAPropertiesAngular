import { TestBed } from '@angular/core/testing';

import { CanonicalServiceService } from './canonical-service.service';

describe('CanonicalServiceService', () => {
  let service: CanonicalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanonicalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
