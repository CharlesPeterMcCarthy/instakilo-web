import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NOTYF } from 'src/app/utils/notyf.token';
import { Notyf } from 'notyf';
import { DateTime } from 'aws-sdk/clients/devicefarm';
import { v1 as uuid } from 'uuid';
import {PostsService} from '../../../services/posts/posts.service';
import { IconCollection } from '../../../interfaces/icon-collection';
import { faComments, faArrowRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'comment-enter',
  templateUrl: './comment-enter.component.html',
  styleUrls: ['./comment-enter.component.less']
})
export class CommentEnterComponent implements OnInit {
  public icons: IconCollection = {
    comments: faComments,
    continue: faArrowRight
  };

  private id: string = uuid();
  private commentText: string="Initial";
  
  public commentForm: FormGroup = new FormGroup({
    commentText: new FormControl('')
  });
  
  constructor(
    private _fb: FormBuilder,
    private _postService: PostsService,
    @Inject(NOTYF) private _notyf: Notyf
  ) { }

  public ngOnInit(): void {
    this.commentForm = this._fb.group({
      commentText: ['', [Validators.required]]
    });

    this.commentForm.valueChanges.subscribe((fields: { [key: string]: any }) => {
    this.commentText=this.commentForm.get('commentText').value;
  });
  }

  public onSubmit = async (): Promise<void> => {
     //this._postService.addComment(this.id.trim(), this.commentText.trim());
     console.log(this.id, this.commentText);
     this.id= uuid();
  }
}