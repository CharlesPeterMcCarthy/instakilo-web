import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPostsResultsComponent } from './search-posts-results.component';

describe('SearchPostsResultsComponent', () => {
  let component: SearchPostsResultsComponent;
  let fixture: ComponentFixture<SearchPostsResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPostsResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPostsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
