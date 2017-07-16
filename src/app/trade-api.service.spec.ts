import { TestBed, inject } from '@angular/core/testing';

import { TradeApiService } from './trade-api.service';

describe('TradeApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradeApiService]
    });
  });

  it('should ...', inject([TradeApiService], (service: TradeApiService) => {
    expect(service).toBeTruthy();
  }));
});
