import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserProfile } from '@instakilo/common';
import { IconCollection } from '../../interfaces/icon-collection';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../../services/users/users.service';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.less']
})
export class EditProfileComponent implements OnInit {

  @Input() public profile: UserProfile;
  public form: FormGroup;

  public icons: IconCollection = {
    save: faSave
  };

  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _usersService: UsersService,
    @Inject(NOTYF) private _notyf: Notyf
  ) { }

  public ngOnInit(): void {
    console.log(this.profile);
    this.form = new FormGroup({
      firstName: new FormControl(this.profile.firstName, Validators.required),
      lastName: new FormControl(this.profile.lastName, Validators.required),
      dob: new FormControl(this.profile.dob, Validators.required)
    });
  }

  public get firstName(): AbstractControl { return this.form.get('firstName'); }
  public get lastName(): AbstractControl { return this.form.get('lastName'); }
  public get dob(): AbstractControl { return this.form.get('dob'); }

  public submit = async (): Promise<void> => {
    if (this.form.valid) {
      console.log(this.form.value);

      const res = await this._usersService.editProfile(this.form.value);

      if (res.success) this._notyf.success('You have successfully updated your profile');
    }
  }

}
