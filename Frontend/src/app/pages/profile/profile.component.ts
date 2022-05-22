import { Component, OnInit } from '@angular/core';
import { ILogInInfo } from 'src/app/models/auth/ILogInInfo';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
