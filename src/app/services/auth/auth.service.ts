import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // readonly baseURL: string = environment.apiURL;

  constructor(
    private _http: HttpClient,
    // private _userService: UserService
  ) { }

  // public IsLoggedIn = (): boolean => !!(this._userService.AuthToken() && this._userService.Username());

  public IsLoggedIn = (): boolean => true;

  public Logout = () => localStorage.clear();

}
