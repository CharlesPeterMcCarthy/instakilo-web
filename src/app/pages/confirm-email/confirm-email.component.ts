import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, CustomAuthError, CustomResponse } from '../../services/auth/auth.service';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.less']
})
export class ConfirmEmailComponent implements OnInit {

  private readonly confirmationCode: string;
  private readonly username: string;
  public isConfirmed: boolean = false;
  private knownErrorTypes: string[] = [ 'CodeMismatchException', 'NotAuthorizedException', 'ExpiredCodeException' ];
  public error: string;

  constructor(
    private _title: Title,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private _spinner: NgxSpinnerService,
    @Inject(NOTYF) private _notyf: Notyf
  ) {
    this._title.setTitle('Confirm Email | InstaKilo');
    this.confirmationCode = this._route.snapshot.paramMap.get('code');
    this.username = this._route.snapshot.paramMap.get('username');
  }

  public async ngOnInit(): Promise<void> {
    await this.CheckConfirmationCode();
  }

  private isKnownError = (code: string): boolean => this.knownErrorTypes.indexOf(code) > -1;

  private CheckConfirmationCode = async (): Promise<void> => {
    await this._spinner.show('confirming');
    const res: CustomResponse = await this._authService.confirmSignUp(this.username, this.confirmationCode);

    console.log(res);
    if (res.success) {
      this.isConfirmed = true;
      await this._router.navigate(['login']);
    } else this.handleError(res.error);
    await this._spinner.hide('confirming');
  }

  private handleError = (err: CustomAuthError): void => {
    if (this.isKnownError(err.code)) this.error = err.code;
    else this._notyf.error('An unknown error has occurred');
  }

}
