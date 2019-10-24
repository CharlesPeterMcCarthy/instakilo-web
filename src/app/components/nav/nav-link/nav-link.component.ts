import { Component, Input } from '@angular/core';
import { NavLink } from '../../../interfaces/nav-link';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.css']
})

export class NavLinkComponent {

  @Input() public navLink: NavLink;

  constructor(private _router: Router) { }

  public isActive = (): boolean => this._router.url === this.navLink.url;

}
