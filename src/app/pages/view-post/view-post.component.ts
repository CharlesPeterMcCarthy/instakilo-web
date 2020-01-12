import { Component, OnInit } from '@angular/core';
import { Post } from '@instakilo/common';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts/posts.service';
import { GetPostResponse } from '../../interfaces/api-response';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.less']
})
export class ViewPostComponent implements OnInit {

  public post: Post;
  public noPost: boolean = false;

  constructor(
    private _title: Title,
    private _route: ActivatedRoute,
    private _postService: PostsService
  ) {
    this._title.setTitle('View Post | InstaKilo');
  }

  public ngOnInit(): void {
    const postId: string = this._route.snapshot.paramMap.get('id');
    this._postService.getPost(postId).subscribe((res: GetPostResponse) => {
      if (res.success && res.post) this.post = res.post;
      else this.noPost = true;
    });
  }

}
