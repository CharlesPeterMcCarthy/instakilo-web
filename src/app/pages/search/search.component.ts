import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { ActivatedRoute } from '@angular/router';
import { PostsBriefResponse, PostsByLocationResponse, PostsByUserResponse } from '../../interfaces/api-response';
import { PostBrief } from '@instakilo/common';
import { Title } from '@angular/platform-browser';

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
  public user: {
    _id: string;
    username: string;
  };
  public posts: PostBrief[];

  constructor(
    private _title: Title,
    private _route: ActivatedRoute,
    private _postsService: PostsService
  ) {
    this._title.setTitle('Search | InstaKilo');
  }

  public ngOnInit(): void {
    this.searchType = this._route.snapshot.paramMap.get('type');
    this.searchValue = this._route.snapshot.paramMap.get('value');

    if (!this.searchType) this.isSearching = true;

    if (this.searchType === 'hashtag') this.getPostsByHashTag(this.searchValue);
    if (this.searchType === 'location') this.getPostsByLocation(this.searchValue);
    if (this.searchType === 'user') this.getPostsByUser(this.searchValue);
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

  private getPostsByUser = (userId: string): void => {
    this._postsService.getPostsByUser(userId).subscribe((data: PostsByUserResponse) => {
      console.log(data);
      if (data.success) {
        this.user = data.user;
        this.posts = data.posts;
      }
    });
  }

}
