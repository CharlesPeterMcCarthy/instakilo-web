import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { OtherProfileResponse } from 'src/app/interfaces/api-response';
import { UserProfile } from '@instakilo/common';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.less']
})
export class ViewProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  viewProfile: OtherProfileResponse;
  isUser: boolean;
  public otherUser: UserProfile;



  ngOnInit() {
    
    const userId: string = this.route.snapshot.paramMap.get('');
    this.usersService.getOtherUserProfile(userId).subscribe((res: OtherProfileResponse) => {
      console.log(res);
      if (res.success && res.profile) this.otherUser = res.profile;
      else this.isUser = true;
    });


  }

}
