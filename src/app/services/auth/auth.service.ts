import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AmplifyService } from 'aws-amplify-angular';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';
import { AuthClass } from 'aws-amplify';
import { AuthState } from 'aws-amplify-angular/src/providers/auth.state';
import { ISignUpResult, CognitoUser } from 'amazon-cognito-identity-js';

export interface CustomAuthError {
  code: string;
  message: string;
  name: string;
}

export interface CustomResponse {
  error?: CustomAuthError;
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
    @Inject(NOTYF) private notyf: Notyf
  ) {
    this._amplifyService.authStateChange$ // Listening for auth state changes
      .subscribe((authState: AuthState) => {
        console.log(authState);
        if (authState.user) {
          this.setAccessToken(authState.user.signInUserSession.accessToken.jwtToken);
          this.user = authState.user;
          console.log(this.user);
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
    // const session = await this.Auth.currentSession();
    // this.setAccessToken(session.getAccessToken().getJwtToken()); // TO BE REMOVED **************************

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
      console.log(e);
      return { error: e, success: false };
    }
  }

  public signUp = async (username: string, email: string, password: string, dob: Date, firstName: string, lastName: string):
    Promise<ISignUpResult | CustomResponse> => {
    try {
      const response = await this.Auth.signUp({
        username,
        password,
        attributes: {
          email,
          birthdate: dob.toISOString().split('T')[0],
          'custom:firstname': firstName,
          'custom:lastname': lastName
        }
      });

      return response;
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

    if (
      e.code === 'InvalidPasswordException'
      || e.code === 'InvalidParameterException'
      && e.message.toLowerCase().indexOf('password') > -1
    ) res.error.code = 'InvalidPasswordException';

    if (e.message.toLowerCase().indexOf('username') > -1) res.error.code = 'InvalidUsernameException';
    if (e.code === 'InvalidParameterException' && e.message.toLowerCase().indexOf('email') > -1) res.error.code = 'InvalidEmailException';

    return res;
  }

  public confirmSignUp = async (username: string, code: string): Promise<CustomResponse> => {
    try {
      await this.Auth.confirmSignUp(username, code);
      return { success: true };
    } catch (e) {
      return { error: e, success: false };
    }
  }

  public getAccessToken = (): string => localStorage.getItem('access-token');

  private setAccessToken = (token: string): void => localStorage.setItem('access-token', token);

  // public refreshSession = async () => {
  //   const user: CognitoUser = await this.Auth.currentAuthenticatedUser()
  //   const curSession = await this.Auth.currentSession();
  //
  //   console.log(curSession);
  //
  //   user.refreshSession(curSession.getRefreshToken(), (err, session) => {
  //     console.log(err);
  //     console.log(session);
  //   });
  // }

}
