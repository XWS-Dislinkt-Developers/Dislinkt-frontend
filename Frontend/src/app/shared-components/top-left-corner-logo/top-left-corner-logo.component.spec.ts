import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLeftCornerLogoComponent } from './top-left-corner-logo.component';

describe('TopLeftCornerLogoComponent', () => {
  let component: TopLeftCornerLogoComponent;
  let fixture: ComponentFixture<TopLeftCornerLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopLeftCornerLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLeftCornerLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
