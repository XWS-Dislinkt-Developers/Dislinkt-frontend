import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-and-notification-settings',
  templateUrl: './privacy-and-notification-settings.component.html',
  styleUrls: ['./privacy-and-notification-settings.component.css']
})
export class PrivacyAndNotificationSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



    //Redirections:
    redirectSettingsAndPrivacy() { window.location.href = "/settings-and-privacy";}

}
