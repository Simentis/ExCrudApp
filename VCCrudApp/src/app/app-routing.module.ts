import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookPostsComponent } from './book-posts/book-posts.component';
import { BookPostComponent } from './book-post/book-post.component';
import { BookPostAddEditComponent } from './book-post-add-edit/book-post-add-edit.component';
import { LibraryPostsComponent } from './library-posts/library-posts.component';
import { LibraryPostAddEditComponent } from './library-post-add-edit/library-post-add-edit.component';
import { LibraryPostComponent } from './library-post/library-post.component';
const routes: Routes = [
  { path: 'library', component: LibraryPostsComponent },
   { path: 'library/add', component: LibraryPostAddEditComponent },
   { path: 'library/edit/:id', component: LibraryPostAddEditComponent },
   { path: 'librarypost/:id', component: LibraryPostComponent },
   { path: '', component: BookPostsComponent, pathMatch: 'full' },
  { path: 'bookpost/:id', component: BookPostComponent },
  { path: 'add', component: BookPostAddEditComponent },
  { path: 'bookpost/edit/:id', component: BookPostAddEditComponent },
  { path: '**', redirectTo: '/' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
