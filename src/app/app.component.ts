import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {

  constructor(
    private _title: Title,
    private auth: AuthService
  ) { }

  public async ngOnInit(): Promise<void> {
    this._title.setTitle('InstaKilo');
    await this.auth.checkUserAuthenticated();
    // await this.auth.login('Chazo8', 'Test123$').then(d => console.log(d));
  }

}
