import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService, CustomAuthError, CustomResponse } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';
import { faSignInAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loginIcon: IconDefinition = faSignInAlt;

  private usernameErrorTypes: string[] = [
    'UserNotFoundException',
    'UserNotConfirmedException'
  ];
  private passwordErrorTypes: string[] = [
    'NotAuthorizedException'
  ];

  constructor(
    private _title: Title,
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private activatedroute: ActivatedRoute,
    private location: Location,
    private _spinner: NgxSpinnerService,
    @Inject(NOTYF) private _notyf: Notyf
  ) {
    this._title.setTitle('Login | InstaKilo');
  }

  public ngOnInit(): void {
    this.loginForm = this._fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    const state: { [k: string]: any } = this.location.getState();
    if (state.username) this.username.setValue(state.username); // Value passed from confirm email page
  }

  public get username(): AbstractControl { return this.loginForm.get('username'); }
  public get password(): AbstractControl { return this.loginForm.get('password'); }

  private isUsernameError = (code: string): boolean => this.usernameErrorTypes.indexOf(code) > -1;
  private isPasswordError = (code: string): boolean => this.passwordErrorTypes.indexOf(code) > -1;

  public login = async (): Promise<void> => {
    await this._spinner.show('spinner');

    const res: CustomResponse = await this._auth.login(this.username.value.trim(), this.password.value.trim());
    if (res.success) await this._router.navigate(['feed']);
    else this.handleError(res.error);

    await this._spinner.hide('spinner');
  }

  private handleError = (err: CustomAuthError): void => {
    if (this.isUsernameError(err.code)) this.username.setErrors({ [err.code]: true });
    else if (this.isPasswordError(err.code)) this.password.setErrors({ [err.code]: true });
    else this._notyf.error('An unknown error has occurred');

    console.log(this.username.errors);
  }

}
