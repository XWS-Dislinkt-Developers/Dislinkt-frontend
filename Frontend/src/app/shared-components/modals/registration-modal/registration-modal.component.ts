import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import Swal from 'sweetalert2';

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
  email: any

  
 

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationServiceService) { }

  ngOnInit(): void {
    //validations
    this.registerForm = this.formBuilder.group({
      username:['',[ Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    //  username:['',[ Validators.required, Validators.pattern('[a-zA-Z0-9]*'), this.validateUsername.bind(this)]],
     name:['',[ Validators.required, Validators.pattern('[a-zA-Z ]*')]], 
       email:['', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
       password: [  '', [
        Validators.required, Validators.minLength(10),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]+)(?=.*[!@#$%^&*()_+~-])[A-Za-z\d!@#$%^&*()_+~-].{9,}') ]  ],
      confirmPassword: ['', [Validators.required, Validators.minLength(10)]],
    },
    { 
      validator: ConfirmedValidator('password', 'confirmPassword'), //provera da l je ista sifra. radi
      validatorPassword : ValidatePassword('password', 'username', 'email') //provera da li sadrzi mejl ili username. ne radi, nikad ne udje u nju
    }
    )
  
  }

  doesPasswordRepeatCharacters() {
    let passString = this.password.toString()
    for (let i = 1; i < passString.length - 1; i++) {
      if (i == passString.length - 2) {
        if (passString.substring(i-1,i) == passString.substring(i,i+1) && passString.substring(i,i+1) == passString.substring(i+1))
          return true
      }
      else if (passString.substring(i-1,i) == passString.substring(i,i+1) && passString.substring(i,i+1) == passString.substring(i+1,i+2))
        return true
    }
    return false
  }

  doesPasswordContainUsername () {
    if (this.password.toString().includes(this.username) && this.username != "")
      return true
    return false
  }

register(){
  if (this.doesPasswordContainUsername()){ 
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Password contains your username. Please, pick another password.",
    
    })
    return
    }
  if (this.doesPasswordRepeatCharacters()) {
    
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "You have too many repeating characters in a row. Please, pick another password.",
    
    })
    return
  }
  console.log("Usao sam u metodu za registraciju")
  this.submitted = true
  if(this.registerForm.invalid ){
    console.log("Nije validna forma")
    return
  }else{
  var pearson={ "username": this.username, "name": this.name, "email":this.email, "gender": "male", "password": this.password, "confirmPassword": this.confirmPassword }
 this.authenticationService.register(pearson)

}
 this.close()

}
  close(): any {
   this.close()
  }

 /*
 validateUsername(username: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[username];
   
    if (this.authenticationService.checkUsername(username) != null ) {
        control.setErrors(null);
    } else {
        control.setErrors({ confirmedValidatorUsername: true });
    }
}
}

 validateUsername(control: AbstractControl) {
   console.log("posivam za proveru username-a")
     this.authenticationService.checkUsername(control.value).subscribe(res => {
      return res ? null : { usernameTaken: true };  //samo se na formi za username doda ovaj validator da se proverava, ali nikad nece biti ispravno jer je uvek neki response, nije null
    });
  }*/
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
function ValidatePassword(controlName: string, matchingControlName: string, matchingControlName2: string): any {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[controlName]; //pronalazi password kao kontrolu
    console.log(passwordControl)
    const usernameControl = formGroup.controls[matchingControlName];
    console.log(usernameControl)
    const emailControl = formGroup.controls[matchingControlName2];
    console.log(emailControl)
 
    if (passwordControl.value.include(usernameControl.value) || passwordControl.value.include(emailControl.value) ) {
      passwordControl.setErrors({ confirmedValidator: true });
      console.log(passwordControl.getError)
    } else {
      passwordControl.setErrors(null);
    }
}

}



