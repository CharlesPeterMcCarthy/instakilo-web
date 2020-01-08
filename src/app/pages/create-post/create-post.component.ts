import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GooglePlacesService } from '../../services/google-places/google-places.service';
import { HashTagsService } from '../../services/hashtags/hashtags.service';
import { S3Service } from '../../services/s3/s3.service';
import { faTimes, faEdit, faShare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PostsService } from '../../services/posts/posts.service';
import { Post, Location, GooglePlace } from '@instakilo/common';
import { ImageCourierService } from '../../services/image-courier/image-courier.service';
import HTMLInputEvent from '../../interfaces/html-input-event';
import { NOTYF } from '../../utils/notyf.token';
import { Notyf } from 'notyf';
import { Subscription } from 'rxjs';
import { GenericResponse } from '../../interfaces/api-response';
import { Progress } from 'aws-sdk/lib/request';
import { IconCollection } from '../../interfaces/icon-collection';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.less']
})

export class CreatePostComponent implements OnInit {

  public postForm: FormGroup = new FormGroup({
    location: new FormControl('', [ Validators.required ]),
    description: new FormControl('')
  });

  public icons: IconCollection = {
    reset: faTimes,
    edit: faEdit,
    share: faShare,
    close: faTimes,
    discard: faTrash
  };

  public highlightedPlace: GooglePlace;
  private highlightedPlaceIndex: number;
  private locationText: string = '';
  public matchingPlaces: GooglePlace[] = [];
  public location: Location;
  public hashTags: string[] = [];
  public imageURL: string;

  constructor(
    private _googlePlaceService: GooglePlacesService,
    private _hashTagService: HashTagsService,
    private _cdr: ChangeDetectorRef,
    private _s3Service: S3Service,
    private _postsService: PostsService,
    private _imageCourier: ImageCourierService,
    private _spinner: NgxSpinnerService,
    private _router: Router,
    @Inject(NOTYF) private notyf: Notyf
  ) { }

  public ngOnInit(): void {
    this.placesListener();
    this.imageUploadListener();
    this.imageUploadProgressListener();

    const imageFile: File = this._imageCourier.takeImage();
    console.log(imageFile);
    imageFile && this.uploadImage(imageFile);
  }

  public locationKeyup = (input: string): void | undefined[] => {
    if (input === this.locationText) return; // Prevent and recall on key-events that aren't text changing

    this.locationText = input;

    if (!input) this.resetMatchingPlaces();
    else this._googlePlaceService.autocompletePlacesMatching(this.locationText);

    this.resetHighlightedLocation();
  }

  public resetHighlightedLocation = (): void => {
    this.highlightedPlaceIndex = undefined;
    this.highlightedPlace = undefined;
  }

  public descriptionKeyup = (description: string): string[] => this.hashTags = this._hashTagService.pluckHashTags(description);

  public setLocation = (place: GooglePlace): void => {
    console.log(place);

    this.location = {
      placeData: place,
      locationName: place.structured_formatting.main_text
    };

    this._cdr.detectChanges(); // Needed to refresh zone
  }

  private placesListener = (): void => {
    this._googlePlaceService.getMatchingPlaces()
      .subscribe((places: GooglePlace[]) => {
        this.matchingPlaces = places;
        this._cdr.detectChanges(); // Needed to refresh places list lag
      });
  }

  public submitForm = async (): Promise<void> => {
    const post: Post = {
      location: this.location,
      description: this.postForm.get('description').value,
      hashTags: this.hashTags,
      imageURL: this.imageURL
    };

    if (!post.imageURL) return this.notyf.error('You must upload an image');

    await this._spinner.show('sharing');

    console.log(post);

    this._postsService.createPost(post).subscribe((res: GenericResponse) => {
      this._spinner.hide('sharing');
      this.notyf.success('Post have been successfully shared with your friends');
      if (res.success) this._router.navigateByUrl('/feed');
    }, () => this._spinner.hide('sharing'));
  }

  public imageSelected = async (e: Event): Promise<void> => {
    const event = e as HTMLInputEvent; // For intellisense
    const imageFile: File = event.target.files && event.target.files[0];
    if (!imageFile) this.notyf.error('No image was selected');
    await this.uploadImage(imageFile);
  }

  private uploadImage = async (image: File): Promise<void> => {
    await this._spinner.show('uploading');
    this._s3Service.upload(image);
  }

  private imageUploadListener = (): Subscription => this._s3Service.uploadListener.subscribe(async (imageURL: string) => {
    this.imageURL = imageURL;
    await this._spinner.hide('uploading');
  });

  private imageUploadProgressListener = (): Subscription => this._s3Service.progressListener.subscribe((res: Progress) => console.log(res));

  private resetMatchingPlaces = (): void => {
    this.matchingPlaces = [];
    this._cdr.detectChanges();
  }

  public resetLocation = (): void => {
    this.location = null;
    this._cdr.detectChanges();
  }

  public highlightDown = (): void => {
    if (this.highlightedPlaceIndex === undefined
      || this.highlightedPlaceIndex === this.matchingPlaces.length - 1) this.highlightedPlaceIndex = 0;
    else this.highlightedPlaceIndex += 1;

    this.setHighlightedLocation(this.matchingPlaces[this.highlightedPlaceIndex]);
  }

  public highlightUp = (): void => {
    if (this.highlightedPlaceIndex === undefined
      || this.highlightedPlaceIndex === 0) this.highlightedPlaceIndex = this.matchingPlaces.length - 1;
    else this.highlightedPlaceIndex -= 1;

    this.setHighlightedLocation(this.matchingPlaces[this.highlightedPlaceIndex]);
  }

  public setHighlightedLocation = (place: GooglePlace): GooglePlace => this.highlightedPlace = place;

  public selectHighlightedLocation = (): void => {
    this.highlightedPlace && this.setLocation(this.highlightedPlace);
  }

  public clearLocationField = (): void => {
    this.locationField.reset();
    this.matchingPlaces = [];
    this._cdr.detectChanges();
    this.resetHighlightedLocation();
  }

  /*
   Prevent form submission on hitting the enter key.
   Location field uses the enter key to select the desired location.
   The text area uses the enter key to add new lines.
  */
  public formEnterKey = (e: Event): boolean => (e as HTMLInputEvent).target.tagName === 'TEXTAREA';

  private get locationField(): FormControl {
    return <FormControl> this.postForm.get('location');
  }

  public placeMainText = (place: GooglePlace): string => place.structured_formatting.main_text;

  public placeSecondaryText = (place: GooglePlace): string =>
    place.structured_formatting.secondary_text ||
    place.structured_formatting.main_text; // Show main text if secondary text doesn't exist (happens with country names)

  public isHighlightedLocation = (place: GooglePlace): boolean =>
    this.highlightedPlace && this.highlightedPlace.place_id === place.place_id;
}
