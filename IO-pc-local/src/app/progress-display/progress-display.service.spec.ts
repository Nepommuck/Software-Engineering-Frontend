import { TestBed } from '@angular/core/testing';

import { ProgressDisplayService } from './progress-display.service';

describe('ProgressDisplayService', () => {
  let service: ProgressDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
