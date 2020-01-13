import { Component, OnInit } from '@angular/core';
import { MatchingHashTagsResponse, MatchingLocationsResponse, MatchingUsersResponse } from '../../interfaces/api-response';
import { PostsService } from '../../services/posts/posts.service';
import { IconCollection } from '../../interfaces/icon-collection';
import { faHashtag, faMapMarkerAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { HashTagSearchResult, LocationSearchResult, UserSearchResult } from '@instakilo/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'search-posts-form',
  templateUrl: './search-posts-form.component.html',
  styleUrls: ['./search-posts-form.component.less']
})
export class SearchPostsFormComponent implements OnInit {

  public matchingHashTags: HashTagSearchResult[];
  public matchingLocations: LocationSearchResult[];
  public matchingUsers: UserSearchResult[];
  public noMatchingHashTags: boolean = false;
  public noMatchingLocations: boolean = false;
  public noMatchingUsers: boolean = false;
  public isSearching: boolean = false;
  public matchingHashTagSearchTerm: string;
  public matchingLocationSearchTerm: string;
  public matchingUserSearchTerm: string;

  public icons: IconCollection = {
    location: faMapMarkerAlt,
    hashtag: faHashtag,
    user: faUserAlt
  };

  constructor(
    private _postsService: PostsService,
    private _spinner: NgxSpinnerService
  ) { }

  public ngOnInit(): void { }

  public hashTagSearch = (value: string): void => {
    this.matchingHashTagSearchTerm = value;

    if (this.matchingHashTagSearchTerm) {
      this.startSpinner();

      this._postsService.getMatchingHashTags(this.matchingHashTagSearchTerm).subscribe((data: MatchingHashTagsResponse) => {
        if (data.success) {
          this.noMatchingHashTags = !data.hashtags.length; // Set to true if no matching hashtags are returned (or false if length > 0)
          this.matchingHashTags = data.hashtags;
        }

        this.stopSpinner();
      });
    } else {
      this.matchingHashTags = [];
      this.noMatchingHashTags = false;
    }
  }

  public locationSearch = (value: string): void => {
    this.matchingLocationSearchTerm = value;

    if (this.matchingLocationSearchTerm) {
      this.isSearching = true;

      this._postsService.getMatchingLocations(this.matchingLocationSearchTerm).subscribe((data: MatchingLocationsResponse) => {
        if (data.success) {
          this.noMatchingLocations = !data.locations.length; // Set to true if no matching locations are returned (or false if length > 0)
          this.matchingLocations = data.locations;
        }

        this.isSearching = false;
      });
    } else {
      this.matchingLocations = [];
      this.noMatchingLocations = false;
    }
  }

  public userSearch = (value: string): void => {
    this.matchingUserSearchTerm = value;

    if (this.matchingUserSearchTerm) {
      this.isSearching = true;

      this._postsService.getMatchingUsers(this.matchingUserSearchTerm).subscribe((data: MatchingUsersResponse) => {
        console.log(data);
        if (data.success) {
          this.noMatchingUsers = !data.users.length; // Set to true if no matching users are returned (or false if length > 0)
          this.matchingUsers = data.users;
        }

        this.isSearching = false;
      });
    } else {
      this.matchingUsers = [];
      this.noMatchingUsers = false;
    }
  }

  private startSpinner = (): boolean => this.isSearching = true;

  private stopSpinner = (): boolean => this.isSearching = false;

}
