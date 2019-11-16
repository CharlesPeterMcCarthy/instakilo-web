import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {

  constructor(private auth: AuthService) { }

  public async ngOnInit(): Promise<void> {
    await this.auth.checkUserAuthenticated();
    this.auth.signUp('chazo4', 'charles@campusconnect.ie',
 'Test123$', new Date(1993, 6, 2), 'Charles', 'McCarthy')
      .then(d => console.log(d))
  }

}
