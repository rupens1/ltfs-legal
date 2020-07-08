import { TestBed } from '@angular/core/testing';

import { RouteGuard } from './route.guard';

describe('RouteGuardGuard', () => {
  let guard: RouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RouteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
