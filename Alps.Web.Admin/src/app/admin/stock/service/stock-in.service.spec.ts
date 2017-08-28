import { TestBed, inject } from '@angular/core/testing';

import { StockInService } from './stock-in.service';

describe('StockInService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockInService]
    });
  });

  it('should be created', inject([StockInService], (service: StockInService) => {
    expect(service).toBeTruthy();
  }));
});
