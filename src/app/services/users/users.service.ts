import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse, MyProfileResponse, OtherProfileResponse } from '../../interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlingService } from '../error-handling/error-handling.service';
import { AuthService, CustomResponse } from '../auth/auth.service';
import { environment } from '../../../environments/environment';
import { EditProfile } from '@instakilo/common';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthClass } from '@aws-amplify/auth';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly baseURL: string = environment.apiURL;

  private Auth: AuthClass = this._amplifyService.auth();

  constructor(
    private _http: HttpClient,
    private _errorHandling: ErrorHandlingService,
    private _authService: AuthService,
    private _amplifyService: AmplifyService
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

  public editProfile = async (userData: EditProfile): Promise<CustomResponse> => {
    userData.dob = moment(userData.dob).format('YYYY-MM-DD');

    try {
      const user = await this.Auth.currentAuthenticatedUser();

      const res = await this.Auth.updateUserAttributes(user, { // Update Cognito details
        'custom:firstname': userData.firstName,
        'custom:lastname': userData.lastName,
        'birthdate': userData.dob
      });

      if (res === 'SUCCESS') {    // Update details in our database
        await this._http.post(
          `${this.baseURL}/user-profile/edit`,
          { userData, ...this.attachAccessToken() })
          .subscribe((data: GenericResponse) => {
              return !!data.success;
            }
          );
        return { success: true };
      }

      return { success: false };
    } catch (e) {
      return { error: e, success: false };
    }
  }

  public editPassword = async (oldPassword: string, newPassword: string): Promise<CustomResponse> => {
    try {
      const user = await this.Auth.currentAuthenticatedUser();
      await this.Auth.changePassword(user, oldPassword, newPassword); // If it fails, it will throw an error
      return { success: true };
    } catch (e) {
      return { error: e, success: false };
    }
  }

  public updateAvatar = (postId: string, imageURL: string): Observable<GenericResponse> =>
    this._http.post(
    `${this.baseURL}/user-profile/update-avatar`,
    { postId, imageURL, ...this.attachAccessToken() }) as Observable<GenericResponse>;

  private attachAccessToken = (): { token: string } => ({ token: this._authService.getAccessToken() });

}
