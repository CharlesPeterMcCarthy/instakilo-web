import { TestBed } from '@angular/core/testing';

import { ImageCourierService } from './image-courier.service';

describe('ImageCourierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageCourierService = TestBed.get(ImageCourierService);
    expect(service).toBeTruthy();
  });
});
