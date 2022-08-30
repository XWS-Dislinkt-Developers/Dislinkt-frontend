import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomLeftVerticalNavbarComponent } from './bottom-left-vertical-navbar.component';

describe('BottomLeftVerticalNavbarComponent', () => {
  let component: BottomLeftVerticalNavbarComponent;
  let fixture: ComponentFixture<BottomLeftVerticalNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomLeftVerticalNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomLeftVerticalNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
