import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-right-vertical-navbar',
  templateUrl: './top-right-vertical-navbar.component.html',
  styleUrls: ['./top-right-vertical-navbar.component.css']
})
export class TopRightVerticalNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Redirections
  redirectRegister()  {window.location.href = "/register";}
  redirectSignIn() {window.location.href = "/sign-in";}

}
