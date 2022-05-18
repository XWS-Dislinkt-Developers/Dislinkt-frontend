import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.css']
})
export class SignInModalComponent implements OnInit {

  username: string = "";
  password: string = "";

  constructor(private _authenticationServiceService: AuthenticationServiceService) { }

  ngOnInit(): void {
  }

  logIn() {
    console.log("AJDE")
    this._authenticationServiceService.logIn(this.username, this.password).subscribe(
      response => {
        localStorage.setItem("userId", response.id);
        localStorage.setItem("userToken", response.token);
        localStorage.setItem("userRole", response.role);
    });
    console.log("")
  }

}
