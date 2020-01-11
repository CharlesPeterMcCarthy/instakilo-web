import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPostsFormComponent } from './search-posts-form.component';

describe('SearchPostsFormComponent', () => {
  let component: SearchPostsFormComponent;
  let fixture: ComponentFixture<SearchPostsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPostsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPostsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
