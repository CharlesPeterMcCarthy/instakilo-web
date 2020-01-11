import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { MyProfileResponse } from 'src/app/interfaces/api-response';
import { UsersService } from 'src/app/services/users/users.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.less']
})
export class EditProfileComponent implements OnInit {
form: FormGroup;
user: Observable<MyProfileResponse>;

  constructor(private fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private activatedroute: ActivatedRoute,
    private usersService: UsersService
    ) { }
  
  ngOnInit() {
    this.form = this.fb.group({
      username : ['', [ Validators.required]],
      email : ['', [Validators.required]],
      dateOfBirth :  ['', [ Validators.required]],
      firstname : ['', [ Validators.required]],
      lastname : ['', [ Validators.required]],   
     
});

this.user = this.usersService.getMyProfile().pipe(
  tap(user => this.form.patchValue(user))
);

}

submit() {
  if (this.form.valid) {
    console.log(this.form.value);
  }
}

}
