import { Inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';

/*
    This service will be used to inject into other services.
    Upon an error being thrown via a HTTP request, the error will be caught and passed here.
    This service will deal with the error and display an appropriate message.

    Errors coming from server-side with the 'custom: true' field will have a specific
    user-friendly message that can be displayed to the user.
    If this flag does not exist, a generic error message will be shown.
*/

@Injectable({
  providedIn: 'root'
})

export class ErrorHandlingService {

  constructor(
    @Inject(NOTYF) private notyf: Notyf
  ) { }

  public handleError = (err: HttpErrorResponse): Observable<never> => {
    const error = err.error;
    const errorText = error.custom && error.message || 'Unknown Error';
    this.notyf.error(errorText);

    return throwError({ success: false });
  }

}
