import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';

@Component({
  selector: 'app-left-vertical-navbar',
  templateUrl: './left-vertical-navbar.component.html',
  styleUrls: ['./left-vertical-navbar.component.css']
})
export class LeftVerticalNavbarComponent implements OnInit {
  user: boolean = false;
  admin: boolean = false;
 

  constructor( private authService: AuthenticationServiceService, private router: Router) { }

  ngOnInit(): void {
    this.admin = this.authService.adminAccess()
    console.log(this.admin)
    this.user = this.authService.userAccess()
    console.log(this.user)
    this.router.navigate(['/']) //da bi mi se osvezio prikaz
  }

    // Redirections
    redirectHomepage()  {window.location.href = "";}
    redirectFeed() {window.location.href = "/feed";}
   
}
