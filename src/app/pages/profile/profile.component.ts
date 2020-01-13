import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { MyProfileResponse, OtherProfileResponse } from 'src/app/interfaces/api-response';
import { MyUserProfile, UserProfile } from '@instakilo/common';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  public profile: MyUserProfile | UserProfile;
  public isMyProfile: boolean = false;
  public editProfile: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private _spinner: NgxSpinnerService,
    @Inject(NOTYF) private _notyf: Notyf
  ) { }

  public async ngOnInit(): Promise<void> {
    const userId: string = this.route.snapshot.paramMap.get('userId');

    if (this.route.snapshot.routeConfig.path === 'profile/edit') this.editProfile = true;

    console.log(userId);
    this.isMyProfile = !userId;

    await this._spinner.show('spinner');

    if (userId) {
      this.usersService.getOtherUserProfile(userId).subscribe(async (res: OtherProfileResponse) => {
        if (res.success && res.profile) this.profile = res.profile;
        else this._notyf.error('Unable to retrieve user profile');

        await this._spinner.hide('spinner');
      });
    } else {
      this.usersService.getMyProfile().subscribe(async (res: MyProfileResponse) => {
        if (res.success && res.profile) this.profile = res.profile;
        else this._notyf.error('Unable to retrieve your profile');

        await this._spinner.hide('spinner');
      });
    }
  }

}
