import { async, TestBed } from '@angular/core/testing';
import { ReportingFeatureModule } from './reporting-feature.module';

describe('ReportingFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReportingFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ReportingFeatureModule).toBeDefined();
  });
});
