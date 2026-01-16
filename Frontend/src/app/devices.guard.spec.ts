import { TestBed } from '@angular/core/testing';

import { DevicesGuard } from './devices.guard';

describe('DevicesGuard', () => {
  let guard: DevicesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DevicesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
