import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-vertical-navbar',
  templateUrl: './left-vertical-navbar.component.html',
  styleUrls: ['./left-vertical-navbar.component.css']
})
export class LeftVerticalNavbarComponent implements OnInit {
  user: boolean = false;
  admin: boolean = false;
  incognito: boolean= false;

  constructor() { }

  ngOnInit(): void {
    this.isUserLogedIn()
  }

    // Redirections
    redirectHomepage()  {window.location.href = "";}
    redirectFeed() {window.location.href = "/feed";}
    isUserLogedIn(){
      console.log( localStorage.getItem("userRole"))
    if(localStorage.getItem("userRole") =='user'){
      this.user =true;
    }if(localStorage.getItem("userRole") =='admin'){
      this.admin = true;
    }
    if(localStorage == null){
      this.incognito =true
    }
   
    
   
    }
}
