import { async, TestBed } from '@angular/core/testing';
import { CustomerPortalTicketsDataAccessModule } from './customer-portal-tickets-data-access.module';

describe('CustomerPortalTicketsDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomerPortalTicketsDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CustomerPortalTicketsDataAccessModule).toBeDefined();
  });
});
