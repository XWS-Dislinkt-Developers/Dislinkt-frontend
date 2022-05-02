import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSkillsAndInterestsComponent } from './update-skills-and-interests.component';

describe('UpdateSkillsAndInterestsComponent', () => {
  let component: UpdateSkillsAndInterestsComponent;
  let fixture: ComponentFixture<UpdateSkillsAndInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSkillsAndInterestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSkillsAndInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
