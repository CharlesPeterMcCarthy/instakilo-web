import { Component, OnInit } from '@angular/core';
import { MatchingHashTagsResponse, MatchingLocationsResponse } from '../../interfaces/api-response';
import { PostsService } from '../../services/posts/posts.service';
import { IconCollection } from '../../interfaces/icon-collection';
import { faArrowRight, faHashtag, faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'search-posts-form',
  templateUrl: './search-posts-form.component.html',
  styleUrls: ['./search-posts-form.component.less']
})
export class SearchPostsFormComponent implements OnInit {

  public matchingHashTags: Array<{ _tag: string; count: number }>;
  public matchingLocations: Array<{ locationName: string; _placeId: string; count: number }>;
  public noMatchingHashTags: boolean = false;
  public noMatchingLocations: boolean = false;
  public matchingHashTagSearchTerm: string;
  public matchingLocationSearchTerm: string;

  public icons: IconCollection = {
    rightArrow: faArrowRight,
    search: faSearch,
    location: faMapMarkerAlt,
    hashtag: faHashtag
  };

  constructor(
    private _postsService: PostsService
  ) { }

  public ngOnInit(): void { }

  public hashTagSearch = (e: KeyboardEvent): void => {
    const target = e.target as HTMLInputElement;

    this.matchingHashTagSearchTerm = target.value;

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

  public locationSearch = (e: KeyboardEvent): void => {
    const target = e.target as HTMLInputElement;

    this.matchingLocationSearchTerm = target.value;

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
