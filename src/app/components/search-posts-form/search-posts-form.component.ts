import { Component, OnInit } from '@angular/core';
import { MatchingHashTagsResponse, MatchingLocationsResponse } from '../../interfaces/api-response';
import { PostsService } from '../../services/posts/posts.service';
import { IconCollection } from '../../interfaces/icon-collection';
import { faHashtag, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { HashTagSearchResult, LocationSearchResult } from '@instakilo/common';

@Component({
  selector: 'search-posts-form',
  templateUrl: './search-posts-form.component.html',
  styleUrls: ['./search-posts-form.component.less']
})
export class SearchPostsFormComponent implements OnInit {

  public matchingHashTags: HashTagSearchResult[];
  public matchingLocations: LocationSearchResult[];
  public noMatchingHashTags: boolean = false;
  public noMatchingLocations: boolean = false;
  public matchingHashTagSearchTerm: string;
  public matchingLocationSearchTerm: string;

  public icons: IconCollection = {
    location: faMapMarkerAlt,
    hashtag: faHashtag
  };

  constructor(
    private _postsService: PostsService
  ) { }

  public ngOnInit(): void { }

  public hashTagSearch = (value: string): void => {
    this.matchingHashTagSearchTerm = value;

    if (this.matchingHashTagSearchTerm) {
      this._postsService.getMatchingHashTags(this.matchingHashTagSearchTerm).subscribe((data: MatchingHashTagsResponse) => {
        if (data.success) {
          this.noMatchingHashTags = !data.hashtags.length; // Set to true if no matching hashtags are returned (or false if length > 0)
          this.matchingHashTags = data.hashtags;
        }
      });
    } else {
      this.matchingHashTags = [];
      this.noMatchingHashTags = false;
    }
  }

  public locationSearch = (value: string): void => {
    this.matchingLocationSearchTerm = value;

    if (this.matchingLocationSearchTerm) {
      this._postsService.getMatchingLocations(this.matchingLocationSearchTerm).subscribe((data: MatchingLocationsResponse) => {
        if (data.success) {
          this.noMatchingLocations = !data.locations.length; // Set to true if no matching locations are returned (or false if length > 0)
          this.matchingLocations = data.locations;
        }
      });
    } else {
      this.matchingLocations = [];
      this.noMatchingLocations = false;
    }
  }

}
