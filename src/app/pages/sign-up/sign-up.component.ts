import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService, CustomAuthError, CustomResponse  } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})

export class SignUpComponent implements OnInit {

  private worked: boolean = false;
  private EmailErrorTypes: string[] = ['InvalidEmailException'];
  private PasswordErrorTypes: string[] = ['InvalidPasswordException'];
  private UserNameErrorTypes: string[] = ['UsernameExistsException', 'InvalidUsernameException' ];
  private DOBErrorTypes: string[] = [' MissingBirthDateException', 'BirthDateTooLongException', 'BirthDateTooShortException' ];

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    @Inject(NOTYF) private _notyf: Notyf
  ) { }

  public signup: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl(''),
    email: new FormControl(''),
    confirmemail: new FormControl(''),
    dob: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  public ngOnInit(): void {
    this.signup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]],
      email: ['', [Validators.required]],
      confirmemail: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: ['', [Validators.required]]
    });
  }

  public get username(): AbstractControl { return this.signup.get('username'); }
  public get password(): AbstractControl { return this.signup.get('password'); }
  public get confirmpassword(): AbstractControl { return this.signup.get('confirmpassword'); }
  public get email(): AbstractControl { return this.signup.get('email'); }
  public get confirmemail(): AbstractControl { return this.signup.get('confirmemail'); }
  public get firstName(): AbstractControl { return this.signup.get('firstName'); }
  public get lastName(): AbstractControl { return this.signup.get('lastName'); }
  public get dob(): AbstractControl { return this.signup.get('dob'); }

  private isUsernameError = (code: string): boolean => this.UserNameErrorTypes.indexOf(code) > -1;
  private isEmailError = (code: string): boolean => this.EmailErrorTypes.indexOf(code) > -1;
  private isPasswordError = (code: string): boolean => this.PasswordErrorTypes.indexOf(code) > -1;
  private isDOBError = (code: string): boolean => this.DOBErrorTypes.indexOf(code) > -1;

  public onSubmit = async (): Promise<void> => {
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
  }

  private handleError = (err: CustomAuthError): void => {
    if (this.isPasswordError(err.code)) this.password.setErrors({ [err.code]: true });
    else if (this.isUsernameError(err.code)) this.username.setErrors({ [err.code]: true });
    else if (this.isEmailError(err.code)) this.email.setErrors({ [err.code]: true });
    else if (this.isDOBError(err.code)) this.dob.setErrors({ [err.code]: true });
    else this._notyf.error('An unknown error has occurred');
  }
}
