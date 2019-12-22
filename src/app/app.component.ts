import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {

  public isMobile: boolean = false;

  constructor(
    private _title: Title,
    private auth: AuthService
  ) { }

  public async ngOnInit(): Promise<void> {
    this._title.setTitle('InstaKilo');
    await this.auth.checkUserAuthenticated();
    this.checkScreenSize(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  public onResize = (event: Event): void => this.checkScreenSize(window.innerWidth);

  private checkScreenSize = (width: number): void => { this.isMobile = width <= 576; };

}
