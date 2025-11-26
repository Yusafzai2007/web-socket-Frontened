import { TestBed } from '@angular/core/testing';

import { UserServiceApiService } from './user-service-api-service';

describe('UserServiceApiService', () => {
  let service: UserServiceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserServiceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
