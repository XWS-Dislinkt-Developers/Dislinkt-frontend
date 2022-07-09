import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  readyForRegistration = false;
  username: any
  name: any
  password: any
  confirmPassword: any
  email: any

  constructor(
    private formBuilder: FormBuilder,  
    private authenticationService: AuthenticationServiceService) { 
    }
    
  ngOnInit(): void {
    console.log("REGISTRATION - PART-01 - [validateRegistrationFormWithErrorMessages()].")
    this.registerForm = this.formBuilder.group({
      username:['',[Validators.required, 
                    Validators.pattern('[a-zA-Z0-9]*')]],
      name:['',[Validators.required, 
                Validators.pattern('[a-zA-Z ]*')]], 
      email:['', [Validators.required, 
                  Validators.email, 
                  Validators.pattern('[A-Za-z0-9._%-+]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      password: [  '', [Validators.required, 
                        Validators.minLength(10),
                        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]+)(?=.*[!@#$%^&*()_+~-])[A-Za-z\d!@#$%^&*()_+~-].{9,}') ]  ],
      confirmPassword: ['', [Validators.required, 
                            Validators.minLength(10)]],
      },
      {  
        validator: checkPasswordWithConfirmedPassword('password', 'confirmPassword'), 
      })
    }

    checkPasswordRepeatingCharacters() {
      let passString = this.password.toString()
      for (let i = 1; i < passString.length - 1; i++) {
        if (i == passString.length - 2) {
          if (passString.substring(i-1,i) == passString.substring(i,i+1) &&
              passString.substring(i,i+1) == passString.substring(i+1))
            return true
        }
        else if (passString.substring(i-1,i) == passString.substring(i,i+1) && 
                  passString.substring(i,i+1) == passString.substring(i+1,i+2))
          return true
      }
      return false
    }

    checkPasswordWithUsername () {
      if (this.password.toString().includes(this.username) && this.username != "")
        return true
      return false
    }

    checkPasswordWithEmail(){
      if (this.password.toString().includes(this.email) && this.email != "")
        return true
      return false
    }

    register(){
      if (this.checkPasswordRepeatingCharacters()){ 
        Swal.fire({ icon: 'error',
                    title: 'Invalid password! 🙁',
                    text: "You have too many repeating characters in a row. Please, pick another password.",
        })
        return
        }
      if (this.checkPasswordWithUsername()) {
        Swal.fire({ icon: 'error',
                    title: 'Invalid password! 🙁',
                    text: "Your password contains your username. Please, pick another password.",
        })
        return
      }
      if (this.checkPasswordWithEmail()) {
        Swal.fire({ icon: 'error',
                    title: 'Invalid password! 🙁',
                    text: "Your password contains your e-mail. Please, pick another password.",
        })
      }
      this.submitted = true
      if(this.registerForm.invalid ){
          Swal.fire({ icon: 'error', 
                      title: 'Invalid input fortmat.',
                      text: "Some of your inputs had invalid pattern. "
        })
        return
      } else {
          var person={ "username": this.username, 
                        "name": this.name, 
                        "email":this.email, "gender": "male", 
                        "password": this.password, 
                        "confirmPassword": this.confirmPassword }
          this.authenticationService.register(person)
          Swal.fire({ 
            icon: 'success', 
            title: 'Yippee! 🐶',
            text: this.username + ', you are successfully registrated!',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 2000,
            footer: 'You will be redirected to the homepage...'
        }).then(function() {
          window.location.href = "";
        })
    
    }
    this.close()
    
    }

    close(): any {
    this.close()
  }

    }
  
  function checkPasswordWithConfirmedPassword(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[controlName];
      const confirmPasswordControl = formGroup.controls[matchingControlName];
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.confirmedValidator) {
          return;
      }
      if (passwordControl.value !== confirmPasswordControl.value) {
          confirmPasswordControl.setErrors({ checkPasswordWithConfirmedPassword: true });
      } else {
          confirmPasswordControl.setErrors(null);
      }
    }
  }



