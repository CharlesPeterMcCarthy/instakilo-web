import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyProfileResponse, OtherProfileResponse } from '../../interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlingService } from '../error-handling/error-handling.service';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly baseURL: string = environment.apiURL;

  constructor(
    private _http: HttpClient,
    private _errorHandling: ErrorHandlingService,
    private _authService: AuthService
  ) { }

  public getMyProfile = (): Observable<MyProfileResponse> =>
    this._http.post(
      `${this.baseURL}/user-profile/mine`,
      this.attachAccessToken()
    ) as Observable<MyProfileResponse>;

  public getOtherUserProfile = (userId: string): Observable<OtherProfileResponse> =>
    this._http.post(
      `${this.baseURL}/user-profile/other`,
      { userId, ...this.attachAccessToken() }
    ) as Observable<OtherProfileResponse>;

  private attachAccessToken = (): { token: string } => ({ token: this._authService.getAccessToken() });

}
