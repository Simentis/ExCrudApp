import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookPostsComponent } from './book-posts/book-posts.component';
import { BookPostComponent } from './book-post/book-post.component';
import { BookPostAddEditComponent } from './book-post-add-edit/book-post-add-edit.component';
import { BookPostService } from './services/book-post.service';
@NgModule({
  declarations: [
    AppComponent,
    BookPostsComponent,
    BookPostComponent,
    BookPostAddEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [BookPostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
