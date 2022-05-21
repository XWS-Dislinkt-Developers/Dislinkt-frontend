import { DOCUMENT } from '@angular/common';
import { IfStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-passwordless-login',
  templateUrl: './passwordless-login.component.html',
  styleUrls: ['./passwordless-login.component.css']
})
export class PasswordlessLoginComponent implements OnInit {
  email: any
  code: any
  passwordlessForm1!:FormGroup
  passwordlessForm!:FormGroup
  submitted1=false;
  submitted= false;

  constructor(@Inject(DOCUMENT) private document: Document,private formBuilder: FormBuilder, private _authenticationServiceService: AuthenticationServiceService) { }

  ngOnInit(): void {
    this.passwordlessForm1 = this.formBuilder.group({
    
      email:['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
    
    }),
    this.passwordlessForm = this.formBuilder.group({
      code:['',[ Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
     
    })

  }

  sendPasswordlessLoginRequest(){
    this.submitted1 = true;
    if(this.passwordlessForm1.invalid){
      return
    } else{

      this.document.getElementById('id-passwordless-modal')!.style.display='none';
     

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
    this.document.getElementById('id-passwordless-login-modal')!.style.display='block';
    } 
  }

PasswordlessLoginRequest() {

  this.submitted = true;
 
  if(this.passwordlessForm.invalid){
    return
  } 
  else {
      this._authenticationServiceService.PasswordlessLoginRequest(this.code).subscribe(
    response => {
      localStorage.setItem("userId", response.id);
      localStorage.setItem("userToken", response.token);
      localStorage.setItem("userRole", response.role);
      if(response.error)
           Swal.fire({
            icon: 'error',
             title: 'Oops...',
             text: response.error,

                  })
                  this.document.getElementById('id-passwordless-login-modal')!.style.display='none';
         }
          )
          this.document.getElementById('id-passwordless-login-modal')!.style.display='none';
       }

}

}