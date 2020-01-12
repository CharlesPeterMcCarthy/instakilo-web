import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Post } from '@instakilo/common';
import { IconCollection } from '../../../interfaces/icon-collection';
import { faAlignLeft, faComments, faEllipsisV, faHashtag, faMapMarkerAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit {

  @Input() public post: Post;

  public icons: IconCollection = {
    location: faMapMarkerAlt,
    description: faAlignLeft,
    hashtags: faHashtag,
    comments: faComments,
    options: faEllipsisV,
    user: faUserAlt
  };

  constructor() { }

  public ngOnInit(): void { }

}
