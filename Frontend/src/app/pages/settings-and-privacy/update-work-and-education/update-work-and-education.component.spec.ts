import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkAndEducationComponent } from './update-work-and-education.component';

describe('UpdateWorkAndEducationComponent', () => {
  let component: UpdateWorkAndEducationComponent;
  let fixture: ComponentFixture<UpdateWorkAndEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWorkAndEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWorkAndEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
