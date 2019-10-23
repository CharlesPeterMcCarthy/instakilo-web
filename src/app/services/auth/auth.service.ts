import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AmplifyService } from 'aws-amplify-angular';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly baseURL: string = environment.apiURL;
  private Auth = this._amplifyService.auth();

  constructor(
    private _http: HttpClient,
    private _amplifyService: AmplifyService
  ) {
      this._amplifyService.authStateChange$
      .subscribe(authState =>
        this.setLoggedInState(authState.state === 'signedIn' && authState.user)
      );
  }

  public setLoggedInState = (loggedIn: boolean) => {
    if (loggedIn) localStorage.setItem('isLoggedIn', 'true');
    else localStorage.clear();
  }

  public checkUserAuthenticated = async () => {
    try {
      await this.Auth.currentAuthenticatedUser({ bypassCache: true }); // Request Cognito to check if user is still valid & authenticated
    } catch (e) { // User is invalid / not authenticated
      this.logout();

      // Show toastr notification
    }
  }

  public isLoggedIn = (): boolean => !!localStorage.getItem('isLoggedIn');

  public logout = async () => await this.Auth.signOut();

  public login = async (username, password) => {
    const res = await this.Auth.signIn(username, password);
  }

  public signUp = async (username, email, password) => {
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
      console.log(e);
    }
  }

  public confirmSignUp = async (username, code) => {
    try {
      return await this.Auth.confirmSignUp(username, code); // Throws error if it fails
    } catch (e) {
      console.error(e);
    }
  }

  private storeLoginTokens = (data) => this._http.post(`${this.baseURL}/store-login-tokens`, data);

}
