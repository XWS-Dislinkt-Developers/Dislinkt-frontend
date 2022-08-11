import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-top-status-bar',
  templateUrl: './top-status-bar.component.html',
  styleUrls: ['./top-status-bar.component.css']
})
export class TopStatusBarComponent implements OnInit {
  admin: boolean=false;
  user: boolean=false;
  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.admin = this.authService.adminAccess()
    console.log(this.admin)
    this.user = this.authService.userAccess()
    console.log(this.user)
  }

}
