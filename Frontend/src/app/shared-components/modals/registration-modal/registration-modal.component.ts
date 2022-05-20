import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';



@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.css']
})
export class RegistrationModalComponent implements OnInit {

  registerForm!:FormGroup
  title='formValidation'
  submitted=false
  username: any
  name: any
  password: any
  confirmPassword: any
  
 

  constructor(private formBuilder: FormBuilder, public authenticationService: AuthenticationServiceService) { }

  ngOnInit(): void {
    //validations
    this.registerForm = this.formBuilder.group({
      username:['',[ Validators.required, Validators.pattern('[a-zA-Z0-9 ]*'), this.validateUsername.bind(this)]],
      name:['',[ Validators.required, Validators.pattern('[a-zA-Z ]*')]], 
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10), Validators.pattern('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{10,30}$/')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(10)]],
    },
    { 
      validator: ConfirmedValidator('password', 'confirmPassword'),
      validatorUsername: this.validateUsername2(this.username),
      validatorPassword : this.validatePassword('password', 'username', 'email')
    }
    )
  
  }
  validatePassword(controlName: string, matchingControlName: string, matchingControlName2: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName]; //pronalazi password kao kontrolu
      const matchingControl = formGroup.controls[matchingControlName];
      const matchingControl2 = formGroup.controls[matchingControlName2];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value.include(matchingControl.value) || control.value.include(matchingControl2.value) ) {
          control.setErrors({ confirmedValidator: true });
      } else {
          control.setErrors(null);
      }
  }

  }
  validateUsername(control: AbstractControl) {
    return this.authenticationService.checkUsername(control.value).subscribe(res => {
      return res ? null : { usernameTaken: true };
    });
  }

register(){
  this.submitted = true
  if(this.registerForm.invalid ){
    return
  }

}
 
 validateUsername2(username: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[username];
   
    if (this.authenticationService.checkUsername(username) != null) {
        control.setErrors({ confirmedValidator: true });
    } else {
        control.setErrors(null);
    }
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




