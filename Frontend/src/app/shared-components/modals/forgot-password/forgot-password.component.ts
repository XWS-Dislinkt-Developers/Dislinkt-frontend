import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: any;
  code: any;
  password: any;
  confirmPassword: any;
  forgotPasswordForm1!:FormGroup
  forgotPasswordForm!:FormGroup
  submitted1=false;
  submitted= false;

  constructor(@Inject(DOCUMENT) private document: Document, private formBuilder: FormBuilder,private _authenticationServiceService: AuthenticationServiceService) { }

  ngOnInit(): void {
    this.forgotPasswordForm1 = this.formBuilder.group({
    
      email:['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
    
    }),

    this.forgotPasswordForm = this.formBuilder.group({
      code:['',[ Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      password: [  '', [
        Validators.required, Validators.minLength(10),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+~-])[A-Za-z\d!@#$%^&*()_+~-].{9,}') ]  ],
      confirmPassword: ['', [Validators.required, Validators.minLength(10)]],
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword'), //provera da l je ista sifra. radi
    })
  }

  sendPasswordRecoveryRequest(){
    this.submitted1 = true;

    if(this.forgotPasswordForm1.invalid){
     
      return

    }else{
      this.document.getElementById('id-forgot-password-modal')!.style.display ='none';
      this.document.getElementById('id-reset-password-modal')!.style.display ='block';

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
  }

  passwordRecovery(){
    this.submitted = true;
    if(this.forgotPasswordForm.invalid){
      return
    }else{

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
            text: response.error,
          
          })
        }
        this.document.getElementById('id-reset-password-modal')!.style.display ='none';
      }
    )
  }
  }

}
function ConfirmedValidator(controlName: string, matchingControlName: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
    }
    if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
    } else {
        matchingControl.setErrors(null);
    }
}
}
