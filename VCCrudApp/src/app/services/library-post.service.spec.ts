import { TestBed } from '@angular/core/testing';

import { LibraryPostService } from './library-post.service';

describe('LibraryPostService', () => {
  let service: LibraryPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
