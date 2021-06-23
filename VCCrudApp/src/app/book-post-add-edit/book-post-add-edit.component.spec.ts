import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPostAddEditComponent } from './book-post-add-edit.component';

describe('BookPostAddEditComponent', () => {
  let component: BookPostAddEditComponent;
  let fixture: ComponentFixture<BookPostAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookPostAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPostAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
