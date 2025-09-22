import { TestBed } from '@angular/core/testing';

import { SubscribeFormService } from './subscribe-form.service';

describe('SubscribeFormService', () => {
  let service: SubscribeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscribeFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
