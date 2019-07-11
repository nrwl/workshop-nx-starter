import { async, TestBed } from '@angular/core/testing';
import { ClientCustomerPortalTicketsDataAccessModule } from './client-customer-portal-tickets-data-access.module';

describe('CustomerPortalTicketsDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientCustomerPortalTicketsDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ClientCustomerPortalTicketsDataAccessModule).toBeDefined();
  });
});
