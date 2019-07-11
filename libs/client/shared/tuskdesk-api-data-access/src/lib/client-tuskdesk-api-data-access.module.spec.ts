import { async, TestBed } from '@angular/core/testing';
import { ClientTuskdeskApiDataAccessModule } from './client-tuskdesk-api-data-access.module';

describe('ClientTuskdeskApiDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientTuskdeskApiDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ClientTuskdeskApiDataAccessModule).toBeDefined();
  });
});
