import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStatusBarComponent } from './top-status-bar.component';

describe('TopStatusBarComponent', () => {
  let component: TopStatusBarComponent;
  let fixture: ComponentFixture<TopStatusBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopStatusBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopStatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
