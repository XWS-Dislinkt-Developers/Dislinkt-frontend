import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostCardComponent } from './user-post-card.component';

describe('UserPostCardComponent', () => {
  let component: UserPostCardComponent;
  let fixture: ComponentFixture<UserPostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPostCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
