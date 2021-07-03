import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryPostsComponent } from './library-posts.component';

describe('LibraryPostsComponent', () => {
  let component: LibraryPostsComponent;
  let fixture: ComponentFixture<LibraryPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
