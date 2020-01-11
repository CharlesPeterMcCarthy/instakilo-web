import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentEnterComponent } from './comment-enter.component';

describe('CommentEnterComponent', () => {
  let component: CommentEnterComponent;
  let fixture: ComponentFixture<CommentEnterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentEnterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
