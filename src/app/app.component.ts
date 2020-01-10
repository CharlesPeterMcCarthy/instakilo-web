import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faSignOutAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from './services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {

  public isMobile: boolean = false;
  public signOutIcon: IconDefinition = faSignOutAlt;

  constructor(
    private _title: Title,
    private _router: Router,
    private auth: AuthService,
    private _user: UsersService
  ) { }

  public async ngOnInit(): Promise<void> {
    this._title.setTitle('InstaKilo');
    await this.auth.checkUserAuthenticated();
    this.checkScreenSize(window.innerWidth);

    this._user.getOtherUserProfile('135e6832-458f-404f-a5b4-1938d434b88b').subscribe(data => console.log(data));
  }

  @HostListener('window:resize', ['$event'])
  public onResize = (event: Event): void => this.checkScreenSize(window.innerWidth);

  private checkScreenSize = (width: number): void => { this.isMobile = width <= 576; };

  public logout = async (): Promise<void> => {
    await this.auth.logout();
    await this._router.navigate(['/']);
  }

}
