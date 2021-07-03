import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryPostService } from '../services/library-post.service';
import { LibraryPost } from '../models/librarypost';

@Component({
  selector: 'app-library-posts',
  templateUrl: './library-posts.component.html',
  styleUrls: ['./library-posts.component.scss']
})
export class LibraryPostsComponent implements OnInit {
  libraryPosts$!: Observable<LibraryPost[]>;

  constructor(private libraryPostService: LibraryPostService) {
  }

  ngOnInit() {
    this.loadLibraryPosts();
  }

  loadLibraryPosts() {
    this.libraryPosts$! = this.libraryPostService.getLibraryPosts();
  }

  delete(libId: number) {
    const ans = confirm('Do you want to delete library with id: ' + libId);
    if (ans) {
      this.libraryPostService.deleteLibraryPost(libId).subscribe((data) => {
        this.loadLibraryPosts();
      });
    }
  }
}