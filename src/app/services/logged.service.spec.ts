import { TestBed } from '@angular/core/testing';

import { LoggedService } from './logged.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('LoggedServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
        HttpClient,
        HttpHandler
    ]
  }));

  it('should be created', () => {
    const service: LoggedService = TestBed.get(LoggedService);
    expect(service).toBeTruthy();
  });
});
