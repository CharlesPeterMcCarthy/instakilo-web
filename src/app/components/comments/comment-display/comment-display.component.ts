import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NOTYF } from 'src/app/utils/notyf.token';
import { Notyf } from 'notyf';
import { IconCollection } from 'src/app/interfaces/icon-collection';
import { faDumpster } from '@fortawesome/free-solid-svg-icons';
import { PostsService } from 'src/app/services/posts/posts.service';
import { Comment } from "@instakilo/common";

@Component({
  selector: 'comment-display',
  templateUrl: './comment-display.component.html',
  styleUrls: ['./comment-display.component.less']
})
export class CommentDisplayComponent implements OnInit {
  
  @Input() username: string;
  @Input() commentText: string;
  @Input() id: string;
  @Input() postId: string;
  @Input() comments: Comment[];
  @Input() currentUsername: string;
  @Output() commentEmit = new EventEmitter();
  isOwned: boolean=false;

  public icons: IconCollection = {
    delete: faDumpster
  };

  public deleteForm: FormGroup = new FormGroup({
    commentText: new FormControl('')
  });

  constructor(
    private _fb: FormBuilder,
    private _postService: PostsService,
    @Inject(NOTYF) private _notyf: Notyf
  ) { }
 
  ngOnInit(): void {
    /*
    if(this.username=this.currentUsername)
    {
      this.isOwned=true;
    }
    */
    console.log(this.username, this.currentUsername);
  }

  public onSubmit = async (): Promise<void> => {
    /*
    --failed attempt at removing from array
    this.comments.forEach(e => {
      if(e._id = this.id)
      {
        e._id=null,
        e.datetime=null,
        e.text=null,
        e.user=null;
      }
    });
    */
    this.commentEmit.emit(this.comments);
    this._postService.deleteComment(this.postId,this.id).subscribe();
    this._postService.deleteComment(this.postId,this.id);
  }

}