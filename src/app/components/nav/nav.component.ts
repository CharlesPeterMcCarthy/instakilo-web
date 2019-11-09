import { Component, Inject, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NavLink } from '../../interfaces/nav-link';
import { DOCUMENT } from '@angular/common';
import { faUserAlt, faUpload, faSignOutAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ImageCourierService } from '../../services/image-courier/image-courier.service';
import HTMLInputEvent from '../../interfaces/html-input-event';
import { IconCollection } from '../../interfaces/icon-collection';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})

export class NavComponent implements OnInit {

  public icons: IconCollection = {
    profile: faUserAlt,
    upload: faUpload,
    logout: faSignOutAlt
  };

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _authService: AuthService,
    private _router: Router,
    private _imageCourier: ImageCourierService
  ) { }

  public ngOnInit(): void { }

  private isBelowNav: boolean = false;
  public expandNav: boolean = false;

  @HostListener('window:scroll', [])
  public OnScroll = (): void => {
    const offset = this.document.documentElement.scrollTop || this.document.body.scrollTop;
    this.isBelowNav = offset >= 20;
  }

  public backgroundColor = (): string => this.isBelowNav || this.expandNav ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.8)';

  public toggleNavBar = (): boolean => this.expandNav = !this.expandNav;

  public closeNavBar = (): void => {
    this.expandNav = false; // Keep within curly braces to stop e.preventDefault() being triggered in the background
  }

  public logout = async (): Promise<void> => {
    this.closeNavBar();
    await this._authService.logout();
    await this._router.navigate(['/']);
  }

  public IsLoggedIn = (): boolean => this._authService.isLoggedIn();

  public uploadImage = async (e: Event): Promise<void> => {
    const event = e as HTMLInputEvent; // For intellisense
    if (!event.target.files || !event.target.files[0]) return;

    this._imageCourier.handoverImage(event.target.files[0]);
    await this._router.navigate(['/create-post']);
  }

  public isCreatingPost = (): boolean => this._router.url === '/create-post'; // For hiding the upload button while on the create-post page

  /*
    Declare the nav links after the functions - Any nav links using the action property
    must have the corresponding action (function) declared before the nav link.
  */
  public navLinksLeft: NavLink[] = [
    { text: 'Feed', url: '/feed' }
  ];

  public navLinksRightLoggedIn: NavLink[] = [
    { text: 'Login', url: '/login' },
    { text: 'Sign Up', url: '/signup' }
  ];

  public navLinksRightLoggedOut: NavLink[] = Array<NavLink>(
    { icon: this.icons.profile, url: '/profile' },
    { icon: this.icons.logout, action: this.logout }
  );

}
