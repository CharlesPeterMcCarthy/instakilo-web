import { Component, Inject, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NavLink } from '../../interfaces/nav-link';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _authService: AuthService,
    private _router: Router
  ) {}

  private isBelowNav: boolean = false;
  public expandNav: boolean = false;

  public navLinksLeft = Array<NavLink>(
    { text: 'Feed', url: '/feed' },
    { text: 'My Profile', url: '/profile' }
  );

  public navLinksRight = Array<NavLink>(
    { text: 'Login', url: '/login' },
    { text: 'Register', url: '/register' }
  );

  public logoutLink: NavLink = ({ text: 'Logout' });

  @HostListener('window:scroll', [])
  public OnScroll = (): void => {
    const offset = this.document.documentElement.scrollTop || this.document.body.scrollTop;
    this.isBelowNav = offset >= 20;
  }

  public BackgroundColor = (): string => this.isBelowNav || this.expandNav ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.8)';

  public ToggleNavbar = (): boolean => this.expandNav = !this.expandNav;

  public CloseNavBar = (): void => {
    this.expandNav = false;
  }

  public Logout = (): void => {
    this._authService.Logout();
    this.CloseNavBar();
    this._router.navigate(['/']);
  }

  public IsLoggedIn = (): boolean => this._authService.IsLoggedIn();

}
