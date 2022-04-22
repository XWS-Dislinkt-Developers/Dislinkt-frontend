import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  // Redirections
  redirectRegister()  {window.location.href = "/register";}
  redirectSignIn() {window.location.href = "/sign-in";}

}
