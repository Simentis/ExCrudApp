import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPostComponent } from './book-post.component';

describe('BookPostComponent', () => {
  let component: BookPostComponent;
  let fixture: ComponentFixture<BookPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
