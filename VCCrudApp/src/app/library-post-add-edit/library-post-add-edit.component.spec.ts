import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryPostAddEditComponent } from './library-post-add-edit.component';

describe('LibraryPostAddEditComponent', () => {
  let component: LibraryPostAddEditComponent;
  let fixture: ComponentFixture<LibraryPostAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryPostAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryPostAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
