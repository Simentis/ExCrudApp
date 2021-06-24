import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BookPostService } from '../services/book-post.service';
import { BookPost } from '../models/bookpost';

@Component({
  selector: 'app-book-post',
  templateUrl: './book-post.component.html',
  styleUrls: ['./book-post.component.scss']
})
export class BookPostComponent implements OnInit {
  bookPost$!: Observable<BookPost>;
  postId!: number;

  constructor(private bookPostService: BookPostService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.postId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadBookPost();
  }

  loadBookPost() {
    this.bookPost$ = this.bookPostService.getBookPost(this.postId);
  }
}