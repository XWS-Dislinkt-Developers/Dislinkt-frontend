import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-skills-and-interests',
  templateUrl: './update-skills-and-interests.component.html',
  styleUrls: ['./update-skills-and-interests.component.css']
})
export class UpdateSkillsAndInterestsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  //Redirections:
  redirectSettingsAndPrivacy() { window.location.href = "/settings-and-privacy";}

}
