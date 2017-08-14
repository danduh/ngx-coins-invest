import { TestBed, inject } from '@angular/core/testing';

import { OutOutletService } from './out-outler.service';

describe('OutOutletService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutOutletService]
    });
  });

  it('should be created', inject([OutOutletService], (service: OutOutletService) => {
    expect(service).toBeTruthy();
  }));
});
