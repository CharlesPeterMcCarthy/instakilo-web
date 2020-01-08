import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { ActivatedRoute } from '@angular/router';
import { PostsBriefResponse } from '../../interfaces/api-response';
import { PostBrief } from '@instakilo/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  public isSearching: boolean = false;
  public searchType: string;
  public searchValue: string;
  public posts: PostBrief[];

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

  }

  public hashTagSearch = (e: KeyboardEvent): void => {
    // console.log(e.target.value);
  }

}
