import { async, TestBed } from '@angular/core/testing';
import { ClientLogsDataAccessModule } from './client-logs-data-access.module';

describe('ClientLogsDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientLogsDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ClientLogsDataAccessModule).toBeDefined();
  });
});
