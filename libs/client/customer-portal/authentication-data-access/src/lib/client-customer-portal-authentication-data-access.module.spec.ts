import { async, TestBed } from '@angular/core/testing';
import { ClientCustomerPortalAuthenticationDataAccessModule } from './client-customer-portal-authentication-data-access.module';

describe('CustomerPortalAuthenticationDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientCustomerPortalAuthenticationDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ClientCustomerPortalAuthenticationDataAccessModule).toBeDefined();
  });
});
