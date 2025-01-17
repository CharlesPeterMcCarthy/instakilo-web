import { Component, OnInit } from '@angular/core';
import { faUserAlt, faUpload, faImages, faSearch, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { IconCollection } from '../../interfaces/icon-collection';
import HTMLInputEvent from '../../interfaces/html-input-event';
import { ImageCourierService } from '../../services/image-courier/image-courier.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.less']
})
export class BottomNavComponent implements OnInit {

  public icons: IconCollection = {
    profile: faUserAlt,
    upload: faUpload,
    feed: faImages,
    search: faSearch,
    login: faSignInAlt,
    signup: faUserPlus
  };

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _imageCourier: ImageCourierService
  ) { }

  public ngOnInit(): void { }

  public IsLoggedIn = (): boolean => this._authService.isLoggedIn();

  public uploadImage = async (e: Event): Promise<void> => {
    console.log(1);
    const event = e as HTMLInputEvent;
    if (!event.target.files || !event.target.files[0]) return;
    console.log(2);

    this._imageCourier.handoverImage(event.target.files[0]);
    console.log(3);
    await this._router.navigate(['/create-post']);
    console.log(4);
  }

}
