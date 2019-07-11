import { async, TestBed } from '@angular/core/testing';
import { ClientReportingFeatureModule } from './client-reporting-feature.module';

describe('ClientReportingFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientReportingFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ClientReportingFeatureModule).toBeDefined();
  });
});
