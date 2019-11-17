import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AmplifyService } from 'aws-amplify-angular';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';
import { AuthClass } from 'aws-amplify';
import { AuthState } from 'aws-amplify-angular/src/providers/auth.state';
import { ISignUpResult, CognitoUser } from 'amazon-cognito-identity-js';
import * as moment from 'moment';
import { UtilsService } from '../utils/utils.service';

export interface CustomAuthError {
  code: string;
  message: string;
  name: string;
}

export interface CustomResponse {
  error?: CustomAuthError;
  [key: string]: any;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Auth: AuthClass = this._amplifyService.auth();
  public user: CognitoUser;

  constructor(
    private _http: HttpClient,
    private _amplifyService: AmplifyService,
    private _uilts: UtilsService,
    @Inject(NOTYF) private notyf: Notyf
  ) {
    this._amplifyService.authStateChange$ // Listening for auth state changes
      .subscribe((authState: AuthState) => {
        console.log(authState);
        if (authState.user) {
          // this.setAccessToken(authState.user.signInUserSession.accessToken.jwtToken);
          this.user = authState.user;
        }

        this.setLoggedInState(authState.state === 'signedIn' && authState.user);
      }
    );
  }

  private setLoggedInState = (loggedIn: boolean): void => {
    if (loggedIn) localStorage.setItem('isLoggedIn', 'true');
    else localStorage.clear();
  }

  /*
    Request Cognito to check if user is still valid & authenticated.
    By-pass the local cache and make a direct call to Cognito to check
    user hasn't been forcefully logged out or removed from the system
  */
  public checkUserAuthenticated = async (): Promise<void> => { // Called when the app first loads
    try {
      await this.Auth.currentAuthenticatedUser({ bypassCache: true }); // Let state change listener handle user object
    } catch (e) { // User is invalid / not authenticated
      if (this.isLoggedIn()) this.notyf.error('You have been logged out');
      this.logout();
    }
  }

  public isLoggedIn = (): boolean => !!localStorage.getItem('isLoggedIn');

  public logout = async (): Promise<void> => await this.Auth.signOut();

  public login = async (username: string, password: string): Promise<CustomResponse> => {
    try {
      await this.Auth.signIn(username, password);
      return { success: true };
    } catch (e) {
      return { error: e, success: false };
    }
  }

  public signUp = async (username: string, email: string, password: string, dob: Date, firstName: string, lastName: string):
    Promise<CustomResponse> => {
    try {
      const response = await this.Auth.signUp({
        username,
        password,
        attributes: {
          email,
          birthdate: moment(dob).format('YYYY-MM-DD'),
          'custom:firstname': firstName,
          'custom:lastname': lastName
        }
      });

      return { success: true, details: response };
    } catch (e) {
      return this.handleSignUpError(e as CustomAuthError);
    }
  }

  private handleSignUpError = (e: CustomAuthError): CustomResponse => {
    const res: CustomResponse = { error: e, success: false };

    /*
        Cognito does not specify which key / value is causing the issues
        We must figure out the specific value that causes the error
        in order to provide accurate validation error messages
    */

    if (e.code === 'InvalidParameterException') {
      if (this._uilts.textContains(e.message, ['username'])) res.error.code = 'InvalidUsernameException';
      if (this._uilts.textContains(e.message, ['email'])) res.error.code = 'InvalidEmailException';
      if (this._uilts.textContains(e.message, ['password'])) res.error.code = 'InvalidPasswordException';
      if (this._uilts.textContains(e.message, ['birthdate', 'required'])) res.error.code = 'MissingBirthDateException';
      if (this._uilts.textContains(e.message, ['birthdate', 'schema', 'longer'])) res.error.code = 'BirthDateTooLongException';
      if (this._uilts.textContains(e.message, ['birthdate', 'schema', 'shorter'])) res.error.code = 'BirthDateTooShortException';
    }

    return res;
  }

  public confirmSignUp = async (username: string, code: string): Promise<CustomResponse> => {
    try {
      await this.Auth.confirmSignUp(username, code);
      return { success: true };
    } catch (e) {
      return { success: false, error: e };
    }
  }

  public requestNewCode = async (username: string): Promise<boolean> => {
    try {
      await this.Auth.resendSignUp(username);
      return true;
    } catch (e) {
      return false;
    }
  }

  public getAccessToken = (): string => this.user.getSignInUserSession().getAccessToken().getJwtToken();

}
