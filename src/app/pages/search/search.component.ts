import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { ActivatedRoute } from '@angular/router';
import {
  MatchingHashTagsResponse,
  MatchingLocationsResponse,
  PostsBriefResponse,
  PostsByLocationResponse
} from '../../interfaces/api-response';
import { PostBrief } from '@instakilo/common';
import { faArrowRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  public isSearching: boolean = false;
  public searchType: string;
  public searchValue: string;
  public locationName: string;
  public posts: PostBrief[];
  public matchingHashTags: Array<{ _tag: string }>;
  public matchingLocations: Array<{ locationName: string; _placeId: string }>;
  public rightArrowIcon: IconDefinition = faArrowRight;

  constructor(
    private _route: ActivatedRoute,
    private _postsService: PostsService
  ) { }

  public ngOnInit(): void {
    this.searchType = this._route.snapshot.paramMap.get('type');
    this.searchValue = this._route.snapshot.paramMap.get('value');

    if (!this.searchType) this.isSearching = true;

    if (this.searchType === 'hashtag') this.getPostsByHashTag(this.searchValue);
    if (this.searchType === 'location') this.getPostsByLocation(this.searchValue);
  }

  private getPostsByHashTag = (hashTag: string): void => {
    this._postsService.getPostsByHashTag(hashTag).subscribe((data: PostsBriefResponse) => {
      console.log(data);
      if (data.success) this.posts = data.posts;
    });
  }

  private getPostsByLocation = (placeId: string): void => {
    this._postsService.getPostsByLocation(placeId).subscribe((data: PostsByLocationResponse) => {
      console.log(data);
      if (data.success) {
        this.locationName = data.locationName;
        this.posts = data.posts;
      }
    });
  }

  public hashTagSearch = (e: KeyboardEvent): void => {
    const target = e.target as HTMLInputElement;

    if (target.value) {
      this._postsService.getMatchingHashTags(target.value).subscribe((data: MatchingHashTagsResponse) => {
        if (data.success) this.matchingHashTags = data.hashtags;
      });
    } else this.matchingHashTags = [];
  }

  public locationSearch = (e: KeyboardEvent): void => {
    const target = e.target as HTMLInputElement;

    if (target.value) {
      this._postsService.getMatchingLocations(target.value).subscribe((data: MatchingLocationsResponse) => {
        console.log(data);
        if (data.success) this.matchingLocations = data.locations;
      });
    } else this.matchingLocations = [];
  }

}