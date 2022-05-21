import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string = "";
  code: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(private _authenticationServiceService: AuthenticationServiceService) { }

  ngOnInit(): void {
  }

  sendPasswordRecoveryRequest(){
    this._authenticationServiceService.sendPasswordRecoveryRequest(this.email).subscribe(
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

  passwordRecovery(){
    this._authenticationServiceService.passwordRecovery(this.code, this.password, this.confirmPassword).subscribe(
      response => {
        if(response.status !="200"){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.error,
        
        })} else{
          Swal.fire({
            icon: 'success',
           // title: '...',
            text: response.error,
          
          })
        }
      }
    )
  }

}
