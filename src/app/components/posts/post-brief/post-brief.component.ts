import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Post } from '@instakilo/common';
import { faMapMarkerAlt, faHashtag, faAlignLeft, faEllipsisV, faArrowRight, faComments, faClock } from '@fortawesome/free-solid-svg-icons';
import { IconCollection } from '../../../interfaces/icon-collection';
import { PostsService } from '../../../services/posts/posts.service';
import { GenericResponse } from '../../../interfaces/api-response';
import { NOTYF } from '../../../utils/notyf.token';
import { Notyf } from 'notyf';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'post-brief',
  templateUrl: './post-brief.component.html',
  styleUrls: ['./post-brief.component.less']
})
export class PostBriefComponent implements OnInit {

  @Input() public post: Post;
  @Input() public ownsPost: boolean = false;
  @Output() public deletedEE: EventEmitter<string> = new EventEmitter();
  @Output() public avatarEE: EventEmitter<boolean> = new EventEmitter();

  public icons: IconCollection = {
    location: faMapMarkerAlt,
    description: faAlignLeft,
    hashtags: faHashtag,
    options: faEllipsisV,
    continue: faArrowRight,
    comments: faComments,
    time: faClock
  };

  constructor(
    private _postsService: PostsService,
    private _usersService: UsersService,
    private modalService: NgbModal,
    @Inject(NOTYF) private notyf: Notyf
  ) { }

  public ngOnInit(): void {
  }

  public deletePost = (content: any, postId: string): void => {
    this.modalService.open(content).result.then((result: string) => { // Button clicked on modal
      if (result !== 'DELETE') return;

      this._postsService.deletePost(postId).subscribe((res: GenericResponse) => {
        if (res.success) {
          this.deletedEE.emit(postId);
          this.notyf.success('Your post has been successfully deleted');
        }
      });
    }, (reason: string) => { // Closed modal by backdrop or other
      console.log(reason);
    });
  }

  public setAvatar = (content: any, postId: string, imageURL: string): void => {
    this.modalService.open(content).result.then(async (result: string) => { // Button clicked on modal
      if (result !== 'CONFIRM') return;

      this._usersService.updateAvatar(postId, imageURL).subscribe((res: GenericResponse) => {
        if (res.success) {
          this.avatarEE.emit(true);
          this.notyf.success('You have successfully updated your avatar');
        }
      });
    }, (reason: string) => { // Closed modal by backdrop or other
      console.log(reason);
    });
  }

}
