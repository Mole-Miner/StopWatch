import { TestBed } from '@angular/core/testing';

import { DisplayedNumberService } from './displayed-number.service';

describe('DisplayedNumberService', () => {
  let service: DisplayedNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayedNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
