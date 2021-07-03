import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LibraryPost } from '../models/librarypost';
@Injectable({
  providedIn: 'root'
})
export class LibraryPostService {
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/LibraryPosts/';
  }

  getLibraryPosts(): Observable<LibraryPost[]> {
    return this.http.get<LibraryPost[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getLibraryPost(libId: number): Observable<LibraryPost> {
      return this.http.get<LibraryPost>(this.myAppUrl + this.myApiUrl + libId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveLibraryPost(libraryPost:any): Observable<LibraryPost> {
      return this.http.post<LibraryPost>(this.myAppUrl + this.myApiUrl, JSON.stringify(libraryPost), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateLibraryPost(libId: number, libraryPost:any): Observable<LibraryPost> {
      return this.http.put<LibraryPost>(this.myAppUrl + this.myApiUrl + libId, JSON.stringify(libraryPost), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteLibraryPost(libId: number): Observable<LibraryPost> {
      return this.http.delete<LibraryPost>(this.myAppUrl + this.myApiUrl + libId)
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