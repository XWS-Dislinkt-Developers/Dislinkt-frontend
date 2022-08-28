import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidRightVerticalNavbarComponent } from './mid-right-vertical-navbar.component';

describe('MidRightVerticalNavbarComponent', () => {
  let component: MidRightVerticalNavbarComponent;
  let fixture: ComponentFixture<MidRightVerticalNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MidRightVerticalNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MidRightVerticalNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
