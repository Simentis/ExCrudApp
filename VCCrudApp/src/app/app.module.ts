import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookPostsComponent } from './book-posts/book-posts.component';
import { BookPostComponent } from './book-post/book-post.component';
import { BookPostAddEditComponent } from './book-post-add-edit/book-post-add-edit.component';
import { BookPostService } from './services/book-post.service';
import { LibraryPostsComponent } from './library-posts/library-posts.component';
import { LibraryPostService } from './services/library-post.service';
import { LibraryPostAddEditComponent } from './library-post-add-edit/library-post-add-edit.component';
import { LibraryPostComponent } from './library-post/library-post.component';
@NgModule({
  declarations: [
    AppComponent,
    BookPostsComponent,
    BookPostComponent,
    BookPostAddEditComponent,
    LibraryPostsComponent,
    LibraryPostAddEditComponent,
    LibraryPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [LibraryPostService,BookPostService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
