import { TestBed } from '@angular/core/testing';

import { ThameService } from './thame.service';

describe('ThameService', () => {
  let service: ThameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
