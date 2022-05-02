import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-personal-data',
  templateUrl: './update-personal-data.component.html',
  styleUrls: ['./update-personal-data.component.css']
})
export class UpdatePersonalDataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  //Redirections:
  redirectSettingsAndPrivacy() { window.location.href = "/settings-and-privacy";}
}
