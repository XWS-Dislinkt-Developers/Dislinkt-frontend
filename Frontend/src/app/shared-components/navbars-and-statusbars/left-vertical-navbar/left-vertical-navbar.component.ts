import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-vertical-navbar',
  templateUrl: './left-vertical-navbar.component.html',
  styleUrls: ['./left-vertical-navbar.component.css']
})
export class LeftVerticalNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    // Redirections
    redirectHomepage()  {window.location.href = "";}
    redirectFeed() {window.location.href = "/feed";}

}
