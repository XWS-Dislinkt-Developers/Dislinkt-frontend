import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/models/auth/CustomValidators';


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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //validations
    this.registerForm = this.formBuilder.group({
      username:['',[ Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      name:['',[ Validators.required, Validators.pattern('[a-zA-Z ]*')]], 
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9!.]*')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    CustomValidators.mustMatch('password', 'confirmPassword'))// insert here)
  
  }
register(){
  this.submitted = true
  if(this.registerForm.invalid ){
    return
  }

}
 

}

