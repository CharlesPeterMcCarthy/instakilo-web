import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { Post } from '@instakilo/common';
import { GetPostsResponse } from '../../interfaces/api-response';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.less']
})

export class FeedComponent implements OnInit {

  public posts: Post[] = [];
  public spinnerName: string = 'gathering';
  private postRequestCount: number = 2;
  private lastEvaluatedKey: string;
  public moreAvailable: boolean = false;

  constructor(
    private _postsService: PostsService,
    private _spinner: NgxSpinnerService
  ) { }

  public async ngOnInit(): Promise<void> {
    await this.getPosts();
  }

  public loadMore = async (): Promise<void> => await this.getPosts();

  private getPosts = async (): Promise<void> => {
    await this._spinner.show(this.spinnerName);

    this._postsService.getPosts(this.postRequestCount, this.lastEvaluatedKey)
      .subscribe((data: GetPostsResponse) => {
        console.log(data);
        if (data) this.sortData(data);
        this._spinner.hide(this.spinnerName);
      }, () => this._spinner.hide(this.spinnerName));

  }

  private sortData = (data: GetPostsResponse): void => {
    this.posts = [ ...this.posts, ...data.posts ];
    this.lastEvaluatedKey = data.lastKey;
    this.moreAvailable = data.moreAvailable;
  }

}
