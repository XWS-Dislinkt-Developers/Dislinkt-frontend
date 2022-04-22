import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRightVerticalNavbarComponent } from './top-right-vertical-navbar.component';

describe('TopRightVerticalNavbarComponent', () => {
  let component: TopRightVerticalNavbarComponent;
  let fixture: ComponentFixture<TopRightVerticalNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopRightVerticalNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRightVerticalNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
