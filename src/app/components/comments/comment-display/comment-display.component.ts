import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NOTYF } from 'src/app/utils/notyf.token';
import { Notyf } from 'notyf';

@Component({
  selector: 'comment-display',
  templateUrl: './comment-display.component.html',
  styleUrls: ['./comment-display.component.less']
})
export class CommentDisplayComponent implements OnInit {
  
  @Input() username: string="as";
  @Input() commentText: string="aaaaaaaaaaaaaaa";

  ngOnInit(): void {
  }

}