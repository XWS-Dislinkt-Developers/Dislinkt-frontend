import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAndPrivacyComponent } from './settings-and-privacy.component';

describe('SettingsAndPrivacyComponent', () => {
  let component: SettingsAndPrivacyComponent;
  let fixture: ComponentFixture<SettingsAndPrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsAndPrivacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAndPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
