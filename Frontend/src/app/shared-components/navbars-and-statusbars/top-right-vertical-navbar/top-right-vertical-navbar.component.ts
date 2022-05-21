import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-top-right-vertical-navbar',
  templateUrl: './top-right-vertical-navbar.component.html',
  styleUrls: ['./top-right-vertical-navbar.component.css']
})
export class TopRightVerticalNavbarComponent implements OnInit {
user: boolean = false;
admin: boolean = false;
incognito: boolean= true;
  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) {}

  ngOnInit(): void {
this.isUserLogedIn()

  }


  //Redirections
  redirectSettingsAndPrivacy() { window.location.href = "/settings-and-privacy";  }; /* user/:id/settings-and-privacy */
  redirectProfile() { window.location.href = "/profile";  }; /* user/:id/profile */


  // Modals
  signInModal()   { this.document.getElementById('id-sign-in-modal')!.style.display = 'block';}
  registerModal() { this.document.getElementById('id-registration-modal')!.style.display = 'block';}
  signOutModal()  { this.document.getElementById('id-sign-out-modal')!.style.display = 'block';}


  //check is user logged and which type is 
  isUserLogedIn(){
    console.log( localStorage.getItem("userRole"))
  if(localStorage.getItem("userRole") =='user'){
    this.user =true;
    this.incognito = false;
  
  }if(localStorage.getItem("userRole") =='admin'){
    this.admin = true;
    this.incognito = false;
  }
  if(localStorage == null){
    this.incognito =true
  }
 
  else {
    this.incognito = true;
  }
  this.router.navigate([''])
  }
}
