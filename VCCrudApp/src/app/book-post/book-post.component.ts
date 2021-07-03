import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookPostService } from '../services/book-post.service';
import { BookPost } from '../models/bookpost';
import { LibraryPostService } from '../services/library-post.service';
import { LibraryPost } from '../models/librarypost';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-post',
  templateUrl: './book-post.component.html',
  styleUrls: ['./book-post.component.scss']
})
export class BookPostComponent implements OnInit {
  form: FormGroup;
  bookPost$!: Observable<BookPost>;
  libraryPost$!: Observable<LibraryPost>;
  formL: string;
  postId!: number;
  libId!: number;
  lib!: number;
  li: number;

  existingBookPost!: BookPost;
  constructor(private bookPostService: BookPostService,private formBuilder: FormBuilder,private libraryPostService: LibraryPostService, private avRoute: ActivatedRoute,private router: Router) {
    this.formL = 'lib';
    const idParam = 'id';
   
    
    if (this.avRoute.snapshot.params[idParam]) {
      this.postId = this.avRoute.snapshot.params[idParam]; 
    }
    this.form = this.formBuilder.group(
      {
        postId: 0,
        lib: ['', [Validators.required]]})
  }

  ngOnInit() {
    this.loadBookPost();
    
  //   setTimeout(() => {
  //     this.router.navigate(['/']);
  // }, 15000);  

  this.bookPostService.getBookPost(this.postId)
  .subscribe(data => (this.existingBookPost = data,
    this.form.controls[this.formL].setValue(data.lib)

  ));
  }
  onSubmit(){
    if (!this.form.valid) {
      return;
    }
    this.li=this.form.get(this.formL).value;
     this.libraryPost$ = this.libraryPostService.getLibraryPost( this.li );
  }
  loadBookPost() {
    this.bookPost$ = this.bookPostService.getBookPost(this.postId);
       
  }
  
  
}