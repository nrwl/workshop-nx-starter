import { async, TestBed } from '@angular/core/testing';
import { LogsBackendModule } from './logs-backend.module';

describe('LogsBackendModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LogsBackendModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LogsBackendModule).toBeDefined();
  });
});
