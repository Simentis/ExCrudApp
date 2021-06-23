import { TestBed } from '@angular/core/testing';

import { BookPostService } from './book-post.service';

describe('BookPostService', () => {
  let service: BookPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
