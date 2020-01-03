import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBriefComponent } from './post-brief.component';

describe('PostBriefComponent', () => {
  let component: PostBriefComponent;
  let fixture: ComponentFixture<PostBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
