import { TestBed } from '@angular/core/testing';
import { HashTagsService } from './hashtags.service';

describe('HashTagsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HashTagsService = TestBed.get(HashTagsService);
    expect(service).toBeTruthy();
  });
});
