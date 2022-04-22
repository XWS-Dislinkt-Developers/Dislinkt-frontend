import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomRightVerticalNavbarComponent } from './bottom-right-vertical-navbar.component';

describe('BottomRightVerticalNavbarComponent', () => {
  let component: BottomRightVerticalNavbarComponent;
  let fixture: ComponentFixture<BottomRightVerticalNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomRightVerticalNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomRightVerticalNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
