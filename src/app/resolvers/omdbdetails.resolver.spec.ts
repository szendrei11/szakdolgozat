import { TestBed } from '@angular/core/testing';

import { OmdbdetailsResolver } from './omdbdetails.resolver';

describe('OmdbdetailsResolver', () => {
  let resolver: OmdbdetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OmdbdetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
