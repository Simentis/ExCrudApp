import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BookPost } from '../models/bookpost';
import { LibraryPost } from '../models/librarypost';
@Injectable({
  providedIn: 'root'
})
export class BookPostService {

  myAppUrl: string;
  myApiUrl: string;
  myApiLUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/BookPosts/';
      this.myApiLUrl = 'api/LibraryPosts/';
  }

  getBookPosts(): Observable<BookPost[]> {
    return this.http.get<BookPost[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getBookPost(postId: number): Observable<BookPost> {
      return this.http.get<BookPost>(this.myAppUrl + this.myApiUrl + postId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveBookPost(bookPost:any): Observable<BookPost> {
      return this.http.post<BookPost>(this.myAppUrl + this.myApiUrl, JSON.stringify(bookPost), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateBookPost(postId: number, bookPost:any): Observable<BookPost> {
      return this.http.put<BookPost>(this.myAppUrl + this.myApiUrl + postId, JSON.stringify(bookPost), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteBookPost(postId: number): Observable<BookPost> {
      return this.http.delete<BookPost>(this.myAppUrl + this.myApiUrl + postId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getLibraryPost(libId: number): Observable<LibraryPost> {
    return this.http.get<LibraryPost>(this.myAppUrl + this.myApiLUrl + libId)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
}
getLibraryPosts(): Observable<BookPost[]> {
  return this.http.get<BookPost[]>(this.myAppUrl + this.myApiLUrl)
  .pipe(
    retry(1),
    catchError(this.errorHandler)
  );
}

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}