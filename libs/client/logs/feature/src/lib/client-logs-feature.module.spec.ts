import { async, TestBed } from '@angular/core/testing';
import { ClientLogsFeatureModule } from './client-logs-feature.module';

describe('ClientLogsFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientLogsFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ClientLogsFeatureModule).toBeDefined();
  });
});
