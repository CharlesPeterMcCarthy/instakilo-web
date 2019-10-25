import { Component, Inject, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NavLink } from '../../interfaces/nav-link';
import { DOCUMENT } from '@angular/common';
import { faUserAlt , IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent {

  public icon: IconDefinition = faUserAlt;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _authService: AuthService,
    private _router: Router
  ) {}

  private isBelowNav: boolean = false;
  public expandNav: boolean = false;

  public navLinksLeft = Array<NavLink>(
    // { text: 'Feed', url: '/feed' },
    { text: 'Create', url: '/create-post' }
  );

  public navLinksRight = Array<NavLink>(
    // { text: 'Login', url: '/login' },
    // { text: 'Sign Up', url: '/signup' }
  );

  public logoutLink: NavLink = ({ text: 'Logout' });

  @HostListener('window:scroll', [])
  public OnScroll = (): void => {
    const offset = this.document.documentElement.scrollTop || this.document.body.scrollTop;
    this.isBelowNav = offset >= 20;
  }

  public backgroundColor = (): string => this.isBelowNav || this.expandNav ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.8)';

  public toggleNavBar = (): boolean => this.expandNav = !this.expandNav;

  public closeNavBar = (): void => {
    this.expandNav = false;
  }

  public logout = async (): Promise<void> => {
    this.closeNavBar();
    await this._authService.logout();
    await this._router.navigate(['/']);
  }

  public IsLoggedIn = (): boolean => this._authService.isLoggedIn();

}
