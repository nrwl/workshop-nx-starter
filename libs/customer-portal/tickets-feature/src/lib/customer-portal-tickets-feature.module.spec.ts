import { async, TestBed } from '@angular/core/testing';
import { CustomerPortalTicketsFeatureModule } from './customer-portal-tickets-feature.module';

describe('CustomerPortalTicketsFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomerPortalTicketsFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CustomerPortalTicketsFeatureModule).toBeDefined();
  });
});
