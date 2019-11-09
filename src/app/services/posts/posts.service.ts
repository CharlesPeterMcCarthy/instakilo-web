import { Injectable } from '@angular/core';
import { Post } from '@instakilo/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from '../error-handling/error-handling.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { GenericResponse, GetOwnPostsResponse, GetPostResponse, GetPostsResponse } from '../../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  private readonly baseURL: string = environment.apiURL;

  constructor(
    private _http: HttpClient,
    private _errorHandling: ErrorHandlingService,
    private _authService: AuthService
  ) { }

  public createPost = (post: Post): Observable<GenericResponse> =>
    this._http.post(
      `${this.baseURL}/create-post`,
      { post, ...this.attachAccessToken() }
    ).pipe(
      catchError(this._errorHandling.handleError)
    ) as Observable<GenericResponse>;

  public updatePost = (postId: string, description: string, hashTags: string[]): Observable<GenericResponse> =>
    this._http.post(
      `${this.baseURL}/update-post`,
      { postInfo: { postId, description, hashTags }, ...this.attachAccessToken() }
    ).pipe(
      catchError(this._errorHandling.handleError)
    ) as Observable<GenericResponse>;

  public deletePost = (postId: string): Observable<GenericResponse> =>
    this._http.post(
      `${this.baseURL}/delete-post`,
      { postId, ...this.attachAccessToken() }
    ).pipe(
      catchError(this._errorHandling.handleError)
    ) as Observable<GenericResponse>;

  /*
    This function will return an array of posts along with an optional value 'lastKey'.
    If this key exists with the response, it means there are extra posts available to query.
    Pass this value through if you call getPosts again, as it will allow the database to only
    send back posts that haven't been sent yet.
  */

  public getPosts = (limit: number, LastEvaluatedKey?: string): Observable<GetPostsResponse> =>
    this._http.post(
      `${this.baseURL}/get-public-posts`,
      { limit, lastKey: LastEvaluatedKey, ...this.attachAccessToken() }
    ) as Observable<GetPostsResponse>;

  public getOwnPosts = (): Observable<GetOwnPostsResponse> =>
    this._http.post(
      `${this.baseURL}/get-own-posts`,
      this.attachAccessToken()
    ) as Observable<GetOwnPostsResponse>;

  public getPost = (postId: string): Observable<GetPostResponse> =>
    this._http.post(
      `${this.baseURL}/get-post`,
      { postId, ...this.attachAccessToken() }
    ) as Observable<GetPostResponse>;

  public addComment = (postId: string, commentText: string): Observable<GenericResponse> =>
    this._http.post(
      `${this.baseURL}/add-comment`,
      { commentText, postId, ...this.attachAccessToken() }
    ) as Observable<GenericResponse>;

  public deleteComment = (postId: string, commentId: string): Observable<GenericResponse> =>
    this._http.post(
      `${this.baseURL}/delete-comment`,
      { postId, commentId, ...this.attachAccessToken() }
    ) as Observable<GenericResponse>;

  private attachAccessToken = (): { token: string } => ({ token: this._authService.getAccessToken() });

}
