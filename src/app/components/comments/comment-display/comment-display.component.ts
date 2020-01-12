import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { NOTYF } from 'src/app/utils/notyf.token';
import { Notyf } from 'notyf';
import { IconCollection } from 'src/app/interfaces/icon-collection';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { PostsService } from 'src/app/services/posts/posts.service';
import { Comment } from '@instakilo/common';
import { UpdatedCommentsResponse } from '../../../interfaces/api-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'comment-display',
  templateUrl: './comment-display.component.html',
  styleUrls: ['./comment-display.component.less']
})
export class CommentDisplayComponent implements OnInit {

  @Input() public comment: Comment;
  @Input() public postId: string;
  @Output() public commentsEE: EventEmitter<Comment[]> = new EventEmitter<Comment[]>();
  public isDeleting: boolean = false;
  public isOwnedByUser: boolean = false;

  public icons: IconCollection = {
    delete: faTimes
  };

  constructor(
    private _postService: PostsService,
    private modalService: NgbModal,
    private _authService: AuthService,
    @Inject(NOTYF) private notyf: Notyf
  ) { }

  public async ngOnInit(): Promise<void> {
    const userId = await this._authService.userId();
    this.isOwnedByUser = userId === this.comment.user._id;
  }

  public deleteComment = (modal: any): void => {
    this.modalService.open(modal).result.then((result: string) => { // Button clicked on modal
      if (result !== 'DELETE') return;

      this.isDeleting = true;

      this._postService.deleteComment(this.postId, this.comment._id).subscribe((res: UpdatedCommentsResponse) => {
        if (res.success && res.comments) {
          this.commentsEE.emit(res.comments);
          this.notyf.success('Your comment has been successfully deleted');
        }

        this.isDeleting = false;
      });
    }, (reason: string) => { // Closed modal by backdrop or other
      console.log(reason);
    });
  }

}
