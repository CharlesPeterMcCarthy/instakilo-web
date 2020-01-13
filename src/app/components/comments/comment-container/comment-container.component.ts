import { Component, Input, OnInit } from '@angular/core';
import { Comment, Post } from '@instakilo/common';

@Component({
  selector: 'comment-container',
  templateUrl: './comment-container.component.html',
  styleUrls: ['./comment-container.component.less']
})
export class CommentContainerComponent implements OnInit {

  @Input() public post: Post;

  constructor() { }

  public ngOnInit(): void { }

  public updateComments = (comments: Comment[]): void => {
    this.post.comments = comments;
    this.post.commentCount = comments.length;
  }

}
