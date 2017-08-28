import { TestBed, inject } from '@angular/core/testing';

import { StockOutService } from './stock-out.service';

describe('StockOutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockOutService]
    });
  });

  it('should be created', inject([StockOutService], (service: StockOutService) => {
    expect(service).toBeTruthy();
  }));
});
