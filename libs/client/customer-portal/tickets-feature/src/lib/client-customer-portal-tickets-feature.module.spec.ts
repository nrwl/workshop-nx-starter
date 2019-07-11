import { async, TestBed } from '@angular/core/testing';
import { ClientCustomerPortalTicketsFeatureModule } from './client-customer-portal-tickets-feature.module';

describe('CustomerPortalTicketsFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientCustomerPortalTicketsFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ClientCustomerPortalTicketsFeatureModule).toBeDefined();
  });
});
