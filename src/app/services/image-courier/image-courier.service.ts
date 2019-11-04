import { Injectable } from '@angular/core';

/*

  A simple service that temporarily holds onto an uploaded image event.
  This will be triggered when the user uploads an image via the navigation option.
  The image is then taken by the create-post component.

*/

@Injectable({
  providedIn: 'root'
})

export class ImageCourierService {

  private image: File;

  public handoverImage = (image: File): File => this.image = image;

  public takeImage = (): File => {
    const image: File = this.image;  // Temporary holding
    this.image = null;                // Reset to prevent same image upload
    return image;
  }

}
