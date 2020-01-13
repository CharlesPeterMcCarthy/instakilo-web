import { Component, Inject, Input, OnInit } from '@angular/core';
import { Post } from '@instakilo/common';
import { IconCollection } from '../../../interfaces/icon-collection';
import { faAlignLeft, faComments, faEllipsisV, faHashtag, faMapMarkerAlt, faUserAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth/auth.service';
import { GenericResponse } from '../../../interfaces/api-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from '../../../services/posts/posts.service';
import { NOTYF } from '../../../utils/notyf.token';
import { Notyf } from 'notyf';
import { UsersService } from '../../../services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit {

  @Input() public post: Post;
  public isOwnedByUser: boolean = false;

  public icons: IconCollection = {
    location: faMapMarkerAlt,
    description: faAlignLeft,
    hashtags: faHashtag,
    comments: faComments,
    options: faEllipsisV,
    user: faUserAlt,
    time: faClock
  };

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private modalService: NgbModal,
    private _postsService: PostsService,
    private _usersService: UsersService,
    @Inject(NOTYF) private notyf: Notyf
  ) { }

  public async ngOnInit(): Promise<void> {
    const userId = await this._authService.userId();
    this.isOwnedByUser = userId === this.post.createdBy._id;
  }

  public deletePost = (content: any, postId: string): void => {
    this.modalService.open(content).result.then((result: string) => { // Button clicked on modal
      if (result !== 'DELETE') return;

      this._postsService.deletePost(postId).subscribe(async (res: GenericResponse) => {
        if (res.success) {
          this.notyf.success('Your post has been successfully deleted');
          await this._router.navigate([ 'feed' ]); // Go back to feed
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
          this.notyf.success('You have successfully updated your avatar');
        }
      });
    }, (reason: string) => { // Closed modal by backdrop or other
      console.log(reason);
    });
  }

}
