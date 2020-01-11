import { Component, OnInit } from '@angular/core';
import { IconCollection } from '../../interfaces/icon-collection';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  private imageSrc: string = '';

  private images: string[] = [
    '../../../assets/svg/home1.svg',
    '../../../assets/svg/home2.svg',
    '../../../assets/svg/home3.svg',
    '../../../assets/svg/home4.svg'
  ];

  public icons: IconCollection = {
    login: faSignInAlt,
    signup: faUserPlus
  };

  constructor() { }

  public ngOnInit(): void {
    this.chooseRandomImage();
  }

  private chooseRandomImage = (): void => {
    this.imageSrc = this.images[Math.floor(Math.random() * this.images.length)];
  }

}
