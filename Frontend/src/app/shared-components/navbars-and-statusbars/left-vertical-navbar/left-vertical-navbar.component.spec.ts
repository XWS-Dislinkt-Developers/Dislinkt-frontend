import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftVerticalNavbarComponent } from './left-vertical-navbar.component';

describe('LeftVerticalNavbarComponent', () => {
  let component: LeftVerticalNavbarComponent;
  let fixture: ComponentFixture<LeftVerticalNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftVerticalNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftVerticalNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
