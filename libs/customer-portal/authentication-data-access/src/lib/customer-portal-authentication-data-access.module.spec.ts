import { async, TestBed } from '@angular/core/testing';
import { CustomerPortalAuthenticationDataAccessModule } from './customer-portal-authentication-data-access.module';

describe('CustomerPortalAuthenticationDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomerPortalAuthenticationDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CustomerPortalAuthenticationDataAccessModule).toBeDefined();
  });
});
