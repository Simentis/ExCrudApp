import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookPostService } from '../services/book-post.service';
import { BookPost } from '../models/bookpost';
import { LibraryPostService } from '../services/library-post.service';
import { LibraryPost } from '../models/librarypost';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-library-post',
  templateUrl: './library-post.component.html',
  styleUrls: ['./library-post.component.scss']
})
export class LibraryPostComponent implements OnInit {
  form: FormGroup;
  bookPost$!: Observable<BookPost[]>;
  libraryPost$!: Observable<LibraryPost>;
  postId!: number;
  libId!: number;
  constructor(private bookPostService: BookPostService,private libraryPostService: LibraryPostService, private avRoute: ActivatedRoute,private router: Router) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.libId = this.avRoute.snapshot.params[idParam]; 
    }
  }
  ngOnInit() {
    this.loadLibraryPost();
  }
  loadLibraryPost() {
    this.libraryPost$ = this.libraryPostService.getLibraryPost(this.libId);
    this.bookPost$! = this.bookPostService.getBookPosts();
  }
}
