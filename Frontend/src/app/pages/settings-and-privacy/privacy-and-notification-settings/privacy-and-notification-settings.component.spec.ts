import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyAndNotificationSettingsComponent } from './privacy-and-notification-settings.component';

describe('PrivacyAndNotificationSettingsComponent', () => {
  let component: PrivacyAndNotificationSettingsComponent;
  let fixture: ComponentFixture<PrivacyAndNotificationSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyAndNotificationSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyAndNotificationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
