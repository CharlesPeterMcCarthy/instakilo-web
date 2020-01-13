import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { MyUserProfile, UserProfile } from '@instakilo/common';
import { IconCollection } from '../../interfaces/icon-collection';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.less']
})
export class ViewProfileComponent implements OnInit {

  @Input() public profile: MyUserProfile | UserProfile;
  @Input() public isMyProfile: boolean = false;
  public isHorizontal: boolean = true;

  public icons: IconCollection = {
    edit: faPencilAlt
  };

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private _cdr: ChangeDetectorRef
  ) { }

  public ngOnInit(): void { }

  public onImageLoad = (img: HTMLImageElement): void => {
    this.isHorizontal = img.width > img.height;
  }

}
