import { TestBed, inject } from '@angular/core/testing';

import { MarketTickerService } from './market-ticker.service';

describe('MarketTickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarketTickerService]
    });
  });

  it('should be created', inject([MarketTickerService], (service: MarketTickerService) => {
    expect(service).toBeTruthy();
  }));
});
