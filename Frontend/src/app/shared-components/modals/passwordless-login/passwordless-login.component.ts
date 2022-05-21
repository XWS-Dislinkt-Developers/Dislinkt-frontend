import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import Swal from 'sweetalert2';

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
        if(response.error !="")
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: response.error,

})
      }
    )
  }

PasswordlessLoginRequest() {
  this._authenticationServiceService.PasswordlessLoginRequest(this.code).subscribe(
    response => {
      localStorage.setItem("userId", response.id);
      localStorage.setItem("userToken", response.token);
      localStorage.setItem("userRole", response.role);
      if(response.error !="")
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: response.error,

})
    }
  )
}

}