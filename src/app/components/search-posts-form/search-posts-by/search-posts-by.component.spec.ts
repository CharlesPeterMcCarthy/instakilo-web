import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPostsByComponent } from './search-posts-by.component';

describe('SearchPostsByComponent', () => {
  let component: SearchPostsByComponent;
  let fixture: ComponentFixture<SearchPostsByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPostsByComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPostsByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
