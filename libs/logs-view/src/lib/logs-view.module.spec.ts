import { async, TestBed } from '@angular/core/testing';
import { LogsViewModule } from './logs-view.module';

describe('LogsViewModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LogsViewModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LogsViewModule).toBeDefined();
  });
});
