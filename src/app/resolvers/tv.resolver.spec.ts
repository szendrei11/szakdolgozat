import { TestBed } from '@angular/core/testing';

import { TvResolver } from './tv.resolver';

describe('TvResolver', () => {
  let resolver: TvResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TvResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
