import { TestBed } from '@angular/core/testing';

import { MdblistService } from './mdblist.service';

describe('MdblistService', () => {
  let service: MdblistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MdblistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
