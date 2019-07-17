import { TestBed } from '@angular/core/testing';

import { TicketTimerService } from './ticket-timer.service';

describe('TicketTimerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TicketTimerService = TestBed.get(TicketTimerService);
    expect(service).toBeTruthy();
  });
});
