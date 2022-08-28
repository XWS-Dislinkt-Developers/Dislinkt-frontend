import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-and-privacy',
  templateUrl: './settings-and-privacy.component.html',
  styleUrls: ['./settings-and-privacy.component.css']
})
export class SettingsAndPrivacyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  //Redirections:
  redirectUpdatePersonalData() { window.location.href = "/settings-and-privacy/update-personal-data";  };
  redirectUpdateWorkAndEducation() { window.location.href = "/settings-and-privacy/update-work-and-education";  }; 
  redirectUpdateSkillsAndInterests() { window.location.href = "/settings-and-privacy/update-skills-and-interests";  }; 

}
