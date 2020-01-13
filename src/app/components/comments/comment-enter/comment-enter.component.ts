import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NOTYF } from 'src/app/utils/notyf.token';
import { Notyf } from 'notyf';
import { PostsService } from '../../../services/posts/posts.service';
import { IconCollection } from '../../../interfaces/icon-collection';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { UpdatedCommentsResponse } from '../../../interfaces/api-response';
import { Comment } from '@instakilo/common';

@Component({
  selector: 'comment-enter',
  templateUrl: './comment-enter.component.html',
  styleUrls: ['./comment-enter.component.less']
})
export class CommentEnterComponent implements OnInit {

  @Input() public postId: string;
  @Output() public commentsEE: EventEmitter<Comment[]> = new EventEmitter<Comment[]>();

  public commentForm: FormGroup = new FormGroup({
    commentText: new FormControl({ disabled: false, value: '' }, Validators.required)
  });

  public icons: IconCollection = {
    send: faPaperPlane
  };

  constructor(
    private _fb: FormBuilder,
    private _postService: PostsService,
    @Inject(NOTYF) private _notyf: Notyf
  ) { }

  public ngOnInit(): void { }

  public get commentText(): AbstractControl { return this.commentForm.get('commentText'); }

  public onSubmit = async (): Promise<void> => {
    const commentText = this.commentText.value.trim();
    if (!commentText) return;

    this.commentText.disable();

    this._postService.addComment(this.postId, commentText).subscribe((res: UpdatedCommentsResponse) => {
      if (res.success && res.comments) {
        this.commentText.setValue('');
        this.commentsEE.emit(res.comments);
        this._notyf.success('Your comment has been posted');
        this.commentText.enable();
      }
    });
  }

}
