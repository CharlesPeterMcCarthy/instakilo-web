import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GooglePlacesService } from '../../services/google-places/google-places.service';
import { HashTagsService } from '../../services/hashtags/hashtags.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

export class CreatePostComponent implements OnInit {

  public postForm = new FormGroup({
    location: new FormControl('', [ Validators.required ]),
    description: new FormControl('')
  });

  public location: object;
  public hashTags: string[] = [];

  constructor(
    private _googlePlaceService: GooglePlacesService,
    private _hashTagService: HashTagsService
  ) {
    this.postForm.valueChanges.subscribe(
      (value: string) => {
        console.log(value);
      }
    );
  }

  ngOnInit() { }

  locationKeyup = (field: HTMLInputElement) => this._googlePlaceService.autocompletePlacesMatching(field);

  descriptionKeyup = (description) => this.hashTags = this._hashTagService.pluckHashTags(description);

  submitForm = () => { }

}
