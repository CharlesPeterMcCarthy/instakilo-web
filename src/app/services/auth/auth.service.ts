import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }

  public IsLoggedIn = (): boolean => false; // temp

  public Logout = () => localStorage.clear();

}
