import { TestBed } from '@angular/core/testing';

import { BlogSchemaService } from './blog-schema.service';

describe('BlogSchemaService', () => {
  let service: BlogSchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogSchemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
