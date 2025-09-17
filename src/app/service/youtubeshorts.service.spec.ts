import { TestBed } from '@angular/core/testing';

import { YoutubeshortsService } from './youtubeshorts.service';

describe('YoutubeshortsService', () => {
  let service: YoutubeshortsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubeshortsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
