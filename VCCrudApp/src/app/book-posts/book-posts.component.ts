import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookPostService } from '../services/book-post.service';
import { BookPost } from '../models/bookpost';

@Component({
  selector: 'app-book-posts',
  templateUrl: './book-posts.component.html',
  styleUrls: ['./book-posts.component.scss']
})
export class BookPostsComponent implements OnInit {
  bookPosts$!: Observable<BookPost[]>;

  constructor(private bookPostService: BookPostService) {
  }

  ngOnInit() {
    this.loadBookPosts();
  }

  loadBookPosts() {
    this.bookPosts$! = this.bookPostService.getBookPosts();
  }

  delete(postId: number) {
    const ans = confirm('Do you want to delete book with id: ' + postId);
    if (ans) {
      this.bookPostService.deleteBookPost(postId).subscribe((data) => {
        this.loadBookPosts();
      });
    }
  }
}