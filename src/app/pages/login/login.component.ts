import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService, CustomAuthError, CustomResponse } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  private usernameErrorTypes: string[] = [
    'UserNotFoundException',
    'UserNotConfirmedException'
  ];
  private passwordErrorTypes: string[] = [
    'NotAuthorizedException'
  ];

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    @Inject(NOTYF) private _notyf: Notyf
  ) { }

  public ngOnInit(): void {
    this.loginForm = this._fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public get username(): AbstractControl { return this.loginForm.get('username'); }
  public get password(): AbstractControl { return this.loginForm.get('password'); }

  private isUsernameError = (code: string): boolean => this.usernameErrorTypes.indexOf(code) > -1;
  private isPasswordError = (code: string): boolean => this.passwordErrorTypes.indexOf(code) > -1;

  public login = async (): Promise<void> => {
    const res: CustomResponse = await this._auth.login(this.username.value.trim(), this.password.value.trim());
    if (res.success) await this._router.navigate(['feed']);
    else this.handleError(res.error);
  }

  private handleError = (err: CustomAuthError): void => {
    if (this.isUsernameError(err.code)) this.username.setErrors({ [err.code]: true });
    else if (this.isPasswordError(err.code)) this.password.setErrors({ [err.code]: true });
    else this._notyf.error('An unknown error has occurred');
  }

}
