import { Component, Input, OnInit } from '@angular/core';
import { PostBrief } from '@instakilo/common';

@Component({
  selector: 'search-posts-results',
  templateUrl: './search-posts-results.component.html',
  styleUrls: ['./search-posts-results.component.less']
})
export class SearchPostsResultsComponent implements OnInit {

  @Input() public searchType: string;
  @Input() public searchValue: string;
  @Input() public locationName: string;
  @Input() public posts: PostBrief[];

  constructor() { }

  public ngOnInit(): void { }

}
