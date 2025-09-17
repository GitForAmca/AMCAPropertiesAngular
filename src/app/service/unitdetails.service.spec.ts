import { TestBed } from '@angular/core/testing';

import { UnitdetailsService } from './unitdetails.service';

describe('UnitdetailsService', () => {
  let service: UnitdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
