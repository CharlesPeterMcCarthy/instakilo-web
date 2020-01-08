import { Component, OnInit } from '@angular/core';
import { Post } from '@instakilo/common';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts/posts.service';
import { GetPostResponse } from '../../interfaces/api-response';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.less']
})
export class ViewPostComponent implements OnInit {

  public post: Post;
  public noPost: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _postService: PostsService
  ) { }

  public ngOnInit(): void {
    const postId: string = this._route.snapshot.paramMap.get('id');
    this._postService.getPost(postId).subscribe((res: GetPostResponse) => {
      console.log(res);
      if (res.success && res.post) this.post = res.post;
      else this.noPost = true;
    });
  }

}
