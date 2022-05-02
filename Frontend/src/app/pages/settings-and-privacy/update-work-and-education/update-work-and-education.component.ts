import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-work-and-education',
  templateUrl: './update-work-and-education.component.html',
  styleUrls: ['./update-work-and-education.component.css']
})
export class UpdateWorkAndEducationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    //Redirections:
    redirectSettingsAndPrivacy() { window.location.href = "/settings-and-privacy";}

}
