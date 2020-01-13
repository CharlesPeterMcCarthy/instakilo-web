import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService, CustomAuthError, CustomResponse  } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';
import { faUserPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {

  public worked: boolean = false;
  public signUpIcon: IconDefinition = faUserPlus;
  private emailErrorTypes: string[] = [ 'InvalidEmailException' ];
  private passwordErrorTypes: string[] = [ 'InvalidPasswordException' ];
  private userNameErrorTypes: string[] = [ 'UsernameExistsException', 'InvalidUsernameException' ];
  private dobErrorTypes: string[] = [ 'MissingBirthDateException', 'BirthDateTooLongException', 'BirthDateTooShortException' ];
  public signup: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl(''),
    email: new FormControl(''),
    dob: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl('')
  });

  constructor(
    private _title: Title,
    private fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _spinner: NgxSpinnerService,
    @Inject(NOTYF) private _notyf: Notyf
  ) {
    this._title.setTitle('Sign Up | InstaKilo');
  }

  public ngOnInit(): void {
    this.signup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      dob: ['', [Validators.required]]
    });

    this.signup.valueChanges.subscribe((fields: { [key: string]: any }) => {
        // Ensure password & confirm password values match
      if (fields.password !== fields.confirmpassword) this.confirmpassword.setErrors({ PasswordMismatch: true });
    });
  }

  public get username(): AbstractControl { return this.signup.get('username'); }
  public get password(): AbstractControl { return this.signup.get('password'); }
  public get confirmpassword(): AbstractControl { return this.signup.get('confirmpassword'); }
  public get email(): AbstractControl { return this.signup.get('email'); }
  public get firstName(): AbstractControl { return this.signup.get('firstname'); }
  public get lastName(): AbstractControl { return this.signup.get('lastname'); }
  public get dob(): AbstractControl { return this.signup.get('dob'); }

  private isUsernameError = (code: string): boolean => this.userNameErrorTypes.indexOf(code) > -1;
  private isEmailError = (code: string): boolean => this.emailErrorTypes.indexOf(code) > -1;
  private isPasswordError = (code: string): boolean => this.passwordErrorTypes.indexOf(code) > -1;
  private isDOBError = (code: string): boolean => this.dobErrorTypes.indexOf(code) > -1;

  public onSubmit = async (): Promise<void> => {
    await this._spinner.show('spinner');

    const res: CustomResponse = await this._auth.signUp(
      this.username.value.trim(),
      this.email.value.trim(),
      this.password.value.trim(),
      this.dob.value.trim(),
      this.firstName.value.trim(),
      this.lastName.value.trim()
    );

    if (res.success) this.worked = true;
    else this.handleError(res.error);

    await this._spinner.hide('spinner');
  }

  private handleError = (err: CustomAuthError): void => {
    if (this.isPasswordError(err.code)) this.password.setErrors({ [err.code]: true });
    else if (this.isUsernameError(err.code)) this.username.setErrors({ [err.code]: true });
    else if (this.isEmailError(err.code)) this.email.setErrors({ [err.code]: true });
    else if (this.isDOBError(err.code)) this.dob.setErrors({ [err.code]: true });
    else this._notyf.error('An unknown error has occurred');
  }
}
