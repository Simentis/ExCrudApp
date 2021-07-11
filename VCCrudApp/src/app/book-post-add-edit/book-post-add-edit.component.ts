import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { BookPostService } from '../services/book-post.service';
import { BookPost } from '../models/bookpost';
import { LibraryPostService } from '../services/library-post.service';
import { LibraryPost } from '../models/librarypost';
@Component({
  selector: 'app-book-post-add-edit',
  templateUrl: './book-post-add-edit.component.html',
  styleUrls: ['./book-post-add-edit.component.scss']
})
export class BookPostAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formTitle: string;
  formBody: string;
  formLi: string;
  postId!: number;
  libId: number;
  selectedValue = "";
  errorMessage: any;
  existingBookPost!: BookPost;
  libraryPosts$!: Observable<LibraryPost[]>;
  bookPost$!: Observable<BookPost>;
  constructor(private bookPostService: BookPostService,private libraryPostService: LibraryPostService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'title';
    this.formBody = 'body';
    this.formLi = 'libb';
    if (this.avRoute.snapshot.params[idParam]) {
      this.postId = this.avRoute.snapshot.params[idParam];

    }

    this.form = this.formBuilder.group(
      {
        postId: 0,
        title: ['', [Validators.required]],
        body: ['', [Validators.required]],
          libb: ['', [Validators.required]] 
      }
    )
  }

  ngOnInit() {
      this.loadLibraryPosts();
      this.loadBookPost();
    if (this.postId > 0) {
      this.actionType = 'Edit';
      this.bookPostService.getBookPost(this.postId)
        .subscribe(data => (
          this.existingBookPost = data,
          this.form.controls[this.formTitle].setValue(data.title),
          this.form.controls[this.formBody].setValue(data.body),
           this.form.controls[this.formLi].setValue(data.lib)

        ));
    }
  }
  loadLibraryPosts() {
     this.libraryPosts$ = this.libraryPostService.getLibraryPosts();
  }
  loadBookPost() {
    this.bookPost$ = this.bookPostService.getBookPost(this.postId);
   
  }
  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let bookPost: BookPost = {
        dt: new Date(),
        creator: 'Marcin',
        title: this.form.get(this.formTitle).value,
        body: this.form.get(this.formBody).value,
         lib: this.form.get(this.formLi).value
      };

      this.bookPostService.saveBookPost(bookPost)
        .subscribe((data) => {
          this.router.navigate(['/']);
        });
    }

    if (this.actionType === 'Edit') {
      let bookPost: BookPost = {
        postId: this.existingBookPost.postId,
        dt: this.existingBookPost.dt,
        creator: this.existingBookPost.creator,
        title: this.form.get(this.formTitle).value,
        body: this.form.get(this.formBody).value,
          lib: this.form.get(this.formLi).value 
      };
      this.bookPostService.updateBookPost(bookPost.postId, bookPost)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
          this.router.navigate(['/']);
        });
    }
  }

  cancel() {
     this.router.navigate(['/']);
  }

  get title() { return this.form.get(this.formTitle); }
  get body() { return this.form.get(this.formBody); }
  get libb() { return this.form.get(this.formLi); }
}