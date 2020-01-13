import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { MyUserProfile, UserProfile } from '@instakilo/common';
import { IconCollection } from '../../interfaces/icon-collection';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeStyle, Title } from '@angular/platform-browser';

@Component({
  selector: 'view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.less']
})
export class ViewProfileComponent implements OnInit {

  @Input() public profile: MyUserProfile | UserProfile;
  @Input() public isMyProfile: boolean = false;
  public avatar: SafeStyle;

  public icons: IconCollection = {
    edit: faPencilAlt
  };

  constructor(
    private _title: Title,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private _sanitization: DomSanitizer
  ) { }

  public ngOnInit(): void {
    this.avatar = this._sanitization.bypassSecurityTrustStyle(`url(${ this.profile.avatar && this.profile.avatar.imageURL || './assets/images/noavatar.jpg' })`);
    this._title.setTitle(`${this.isMyProfile ? 'My Profile' : this.profile.username} | InstaKilo`);
  }

  public myProfile = (): MyUserProfile => this.profile as MyUserProfile;

}
