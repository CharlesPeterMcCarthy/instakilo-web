import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { MyProfileResponse } from 'src/app/interfaces/api-response';
import { MyUserProfile } from '@instakilo/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}


  myprofile: MyProfileResponse;
  isUser: boolean;
  public currentUser: MyUserProfile;


  ngOnInit() {

    this.route.data.subscribe(
      (data: {myprofile: MyProfileResponse}) => {
        this.myprofile = data.myprofile;
      }
    );

    
this.currentUser.subscribe(
   (userData: MyUserProfile) => {
     this.currentUser = userData;
     this.isUser = (this.currentUser == this.myprofile.profile);
   }
 )



  }

}
