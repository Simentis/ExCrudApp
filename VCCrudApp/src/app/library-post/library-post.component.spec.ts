import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryPostComponent } from './library-post.component';

describe('LibraryPostComponent', () => {
  let component: LibraryPostComponent;
  let fixture: ComponentFixture<LibraryPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
