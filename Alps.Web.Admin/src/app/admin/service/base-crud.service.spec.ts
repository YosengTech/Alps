import { TestBed, inject } from '@angular/core/testing';

import { BaseCrudService } from './base-crud.service';

describe('BaseCrudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseCrudService]
    });
  });

  it('should be created', inject([BaseCrudService], (service: BaseCrudService<any>) => {
    expect(service).toBeTruthy();
  }));
});
