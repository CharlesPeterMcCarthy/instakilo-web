import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { Post } from '@instakilo/common';
import { GetPostsResponse } from '../../interfaces/api-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { faSyncAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.less']
})

export class FeedComponent implements OnInit {

  public posts: Post[] = [];
  public initSpinnerName: string = 'initGathering';
  public moreSpinnerName: string = 'moreGathering';
  private postRequestCount: number = 2;
  private lastEvaluatedKey: string;
  public moreAvailable: boolean = false;
  private retrievingPosts: boolean = false; // Used to prevent multiple calls at the same time
  public loadMoreIcon: IconDefinition = faSyncAlt;
  private currentUserId: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _postsService: PostsService,
    private _spinner: NgxSpinnerService,
    private _title: Title,
    private _authService: AuthService
  ) {
    this._title.setTitle('Post Feed | InstaKilo');
  }

  public async ngOnInit(): Promise<void> {
    await this.getPosts(this.initSpinnerName);

    const userId = await this._authService.userId();
    this.currentUserId = userId;
  }

  @HostListener('window:scroll', [])
  public OnScroll = async (): Promise<void> => {
    if (window.innerHeight + window.scrollY >= this.document.documentElement.offsetHeight
      && this.moreAvailable
      && !this.retrievingPosts) await this.getPosts(this.moreSpinnerName);
  }

  public loadMore = async (): Promise<void> => await this.getPosts(this.moreSpinnerName);

  private getPosts = async (spinnerName: string): Promise<void> => {
    this.retrievingPosts = true;
    await this._spinner.show(spinnerName);

    this._postsService.getPosts(this.postRequestCount, this.lastEvaluatedKey)
      .subscribe((data: GetPostsResponse) => {
        console.log(data);
        if (data) this.sortData(data);
        this._spinner.hide(spinnerName);
        this.retrievingPosts = false;
      }, () => {
        this._spinner.hide(spinnerName);
        this.retrievingPosts = false;
      });

  }

  private sortData = (data: GetPostsResponse): void => {
    this.posts = [ ...this.posts, ...data.posts ];
    this.lastEvaluatedKey = data.lastKey;
    this.moreAvailable = data.moreAvailable;
  }

  public postDeleted = (postId: string): void => { // Remove deleted post from the currently displayed array
    if (postId) this.posts = this.posts.filter((p: Post) => p._id !== postId);
  }

}
