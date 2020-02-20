import { TestBed } from '@angular/core/testing';

import { GetJsonDataService } from './get-json-data.service';

describe('GetJsonDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetJsonDataService = TestBed.get(GetJsonDataService);
    expect(service).toBeTruthy();
  });
});
