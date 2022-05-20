import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';

@Component({
  selector: 'app-passwordless-login',
  templateUrl: './passwordless-login.component.html',
  styleUrls: ['./passwordless-login.component.css']
})
export class PasswordlessLoginComponent implements OnInit {
  email: string = "";
  code: string = "";

  constructor(private _authenticationServiceService: AuthenticationServiceService) { }

  ngOnInit(): void {
  }

  sendPasswordlessLoginRequest(){
    this._authenticationServiceService.sendPasswordlessLoginRequest(this.email).subscribe(
      response => {
        alert(response.error)
      }
    )
  }

PasswordlessLoginRequest() {
  this._authenticationServiceService.PasswordlessLoginRequest(this.code).subscribe(
    response => {
      alert(response.error)
    }
  )
}

}