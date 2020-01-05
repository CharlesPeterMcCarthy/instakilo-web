import { Component, Input, OnInit } from '@angular/core';
import { Post } from '@instakilo/common';
import { faMapMarkerAlt, faHashtag, faAlignLeft, faEllipsisV, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IconCollection } from '../../../interfaces/icon-collection';

@Component({
  selector: 'post-brief',
  templateUrl: './post-brief.component.html',
  styleUrls: ['./post-brief.component.less']
})
export class PostBriefComponent implements OnInit {

  @Input() public post: Post;

  public icons: IconCollection = {
    location: faMapMarkerAlt,
    description: faAlignLeft,
    hashtags: faHashtag,
    options: faEllipsisV,
    continue: faArrowRight
  };

  constructor() { }

  public ngOnInit(): void { }

}
