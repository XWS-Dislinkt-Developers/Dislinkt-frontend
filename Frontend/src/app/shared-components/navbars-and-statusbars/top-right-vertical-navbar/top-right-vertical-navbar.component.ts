import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-top-right-vertical-navbar',
  templateUrl: './top-right-vertical-navbar.component.html',
  styleUrls: ['./top-right-vertical-navbar.component.css']
})
export class TopRightVerticalNavbarComponent implements OnInit {
//user$: Observable<boolean> | undefined;
//admin$: Observable<boolean> | undefined;
admin: boolean=false;
user: boolean=false;

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private router: Router, 
    private authService: AuthenticationService) {}

  ngOnInit(): void {

   this.admin = this.authService.adminAccess()
   console.log(this.admin)
   this.user = this.authService.userAccess()
   console.log(this.user)
 
   

  }


  //Redirections
  redirectSettingsAndPrivacy() { window.location.href = "/settings-and-privacy";  }; /* user/:id/settings-and-privacy */
  redirectProfile() { window.location.href = "/profile/" + localStorage.getItem('userId');  }; /* user/:id/profile */


  // Modals
  signInModal()   { this.document.getElementById('id-sign-in-modal')!.style.display = 'block';}
  registerModal() { this.document.getElementById('id-registration-modal')!.style.display = 'block';}
  signOutModal()  { this.document.getElementById('id-sign-out-modal')!.style.display = 'block'; }

}
 
