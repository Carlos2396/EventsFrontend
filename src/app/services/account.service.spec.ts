import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
        HttpClient,
        HttpHandler
    ]
  }));

  it('should be created', () => {
    const service: AccountService = TestBed.get(AccountService);
    expect(service).toBeTruthy();
  });
});
