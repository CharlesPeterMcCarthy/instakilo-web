import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AmplifyService } from 'aws-amplify-angular';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';
import { AuthClass } from 'aws-amplify';
import { AuthState } from 'aws-amplify-angular/src/providers/auth.state';
import { ISignUpResult, CognitoUser } from 'amazon-cognito-identity-js';

interface CustomAuthError {
  error: Error;
  success: boolean;
  field: null | string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private Auth: AuthClass = this._amplifyService.auth();

  constructor(
    private _http: HttpClient,
    private _amplifyService: AmplifyService,
    @Inject(NOTYF) private notyf: Notyf
  ) {
    this._amplifyService.authStateChange$ // Listening for auth state changes
    .subscribe((authState: AuthState) => {
       console.log(authState);
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
    const session = await this.Auth.currentSession();
    this.setAccessToken(session.getAccessToken().getJwtToken()); // TO BE REMOVED **************************

    try {
      await this.Auth.currentAuthenticatedUser({ bypassCache: true }); // Let state change listener handle user object
    } catch (e) { // User is invalid / not authenticated
      if (this.isLoggedIn()) this.notyf.error('You have been logged out');
      this.logout();
    }
  }

  public isLoggedIn = (): boolean => !!localStorage.getItem('isLoggedIn');

  public logout = async (): Promise<void> => await this.Auth.signOut();

  public login = async (username: string, password: string): Promise<{ success: boolean; error?: Error }> => {
    try {
      await this.Auth.signIn(username, password);
      return { success: true };
    } catch (e) {
      if (e.code === 'UserNotFoundException') this.notyf.error('The username you enter does not match any accounts in our system');
      if (e.code === 'NotAuthorizedException') this.notyf.error('The password you entered is incorrect');
      if (e.code === 'UserNotConfirmedException') this.notyf.error('You have not confirmed your account yet');
      return { error: e, success: false };
    }
  }

  public signUp = async (username: string, email: string, password: string): Promise<ISignUpResult | CustomAuthError> => {
    try {
      const response = await this.Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      });

      return response;
    } catch (e) {
      return this.handleSignUpError(e);
    }
  }

  private handleSignUpError = (e: any): CustomAuthError => {
    const customError: CustomAuthError = { error: e, success: false, field: null };

    if (
      e.code === 'InvalidPasswordException'
      || e.code === 'InvalidParameterException'
      && e.message.toLowerCase().indexOf('password') > -1
    ) customError.field = 'password';

    if (e.message.toLowerCase().indexOf('username') > -1) customError.field = 'username';
    if (e.code === 'InvalidParameterException' && e.message.toLowerCase().indexOf('email') > -1) customError.field = 'email';

    if (customError.field === 'password') this.notyf.error('Password is invalid');
    if (customError.field === 'username') this.notyf.error('Username is invalid');
    if (e.code === 'UsernameExistsException') this.notyf.error('An account with that username already exists');

    return customError;
  }

  public confirmSignUp = async (username: string, code: string): Promise<{ success: boolean; error?: Error }> => {
    try {
      await this.Auth.confirmSignUp(username, code);
      return { success: true };
    } catch (e) {
      if (e.code === 'CodeMismatchException') this.notyf.error('The confirmation code you entered is incorrect');
      if (e.code === 'NotAuthorizedException') this.notyf.error('This account has already been confirmed');
      if (e.code === 'ExpiredCodeException') this.notyf.error('The confirmation code you entered has expired. Please request a new one.');
      return { error: e, success: false };
    }
  }

  public getAccessToken = (): string => localStorage.getItem('access-token');

  private setAccessToken = (token: string): void => localStorage.setItem('access-token', token);

  public refreshSession = async () => {
    const user: CognitoUser = await this.Auth.currentAuthenticatedUser()
    const curSession = await this.Auth.currentSession();

    console.log(curSession);

    user.refreshSession(curSession.getRefreshToken(), (err, session) => {
      console.log(err);
      console.log(session);
    });
  }

}
