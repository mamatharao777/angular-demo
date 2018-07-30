import { TestBed, inject } from '@angular/core/testing';

import { FakeserverService } from './fakeserver.service';

describe('FakeserverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeserverService]
    });
  });

  it('should be created', inject([FakeserverService], (service: FakeserverService) => {
    expect(service).toBeTruthy();
  }));
});
