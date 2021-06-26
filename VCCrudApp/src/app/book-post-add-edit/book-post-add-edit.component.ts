import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookPostService } from '../services/book-post.service';
import { BookPost } from '../models/bookpost';

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
  postId!: number;
  errorMessage: any;
  existingBookPost!: BookPost;

  constructor(private bookPostService: BookPostService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'title';
    this.formBody = 'body';
    if (this.avRoute.snapshot.params[idParam]) {
      this.postId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        postId: 0,
        title: ['', [Validators.required]],
        body: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {

    if (this.postId > 0) {
      this.actionType = 'Edit';
      this.bookPostService.getBookPost(this.postId)
        .subscribe(data => (
          this.existingBookPost = data,
          this.form.controls[this.formTitle].setValue(data.title),
          this.form.controls[this.formBody].setValue(data.body)
        ));
    }
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
        body: this.form.get(this.formBody).value
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
        body: this.form.get(this.formBody).value
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
}