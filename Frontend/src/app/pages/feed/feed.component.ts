import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  user: boolean=false;
  admin: boolean=false;
  usernameInfo: any
  constructor() { }

  ngOnInit(): void {
    this.isUserLoggedIn()
  }

  isUserLoggedIn(){
    this.usernameInfo = localStorage.getItem("username");
    if(localStorage.getItem("userRole") =='user'){
      this.user =true;
    }if(localStorage.getItem("userRole") =='admin'){
      this.admin = true;
    }
  }

}
