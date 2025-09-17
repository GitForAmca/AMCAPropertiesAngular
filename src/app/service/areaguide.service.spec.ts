import { TestBed } from '@angular/core/testing';

import { AreaguideService } from './areaguide.service';

describe('AreaguideService', () => {
  let service: AreaguideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaguideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
