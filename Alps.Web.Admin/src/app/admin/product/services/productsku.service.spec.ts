import { TestBed, inject } from '@angular/core/testing';

import { ProductskuService } from './productsku.service';

describe('ProductskuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductskuService]
    });
  });

  it('should be created', inject([ProductskuService], (service: ProductskuService) => {
    expect(service).toBeTruthy();
  }));
});
