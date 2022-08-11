import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.css']
})
export class SignInModalComponent implements OnInit {

  username: any
  password: any
  signInForm!:FormGroup
 
  submitted=false


  constructor(private router: Router, private formBuilder: FormBuilder, private _AuthenticationService: AuthenticationService) { }

  ngOnInit(): void {
    //validations 
   //validation
  
   this.signInForm= this.formBuilder.group({
      username:['',[ Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      password: [  '', [
        
        Validators.required, Validators.minLength(10),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+~-])[A-Za-z\d!@#$%^&*()_+~-].{9,}') 
      ]  
      ],
    }
  
    )
    
  }

  logIn() {
    this.submitted = true;
    if(this.signInForm.invalid){
      return
    } else {

   
    this._AuthenticationService.logIn(this.username, this.password).subscribe(
      response => {
        localStorage.setItem("userId", response.id);
        localStorage.setItem("userToken", response.token);
        localStorage.setItem("userRole", response.role);
        localStorage.setItem("username", response.username)
        this.router.navigate(['/profile/'+ localStorage.getItem("userId")]) //OVO RADI!!
    
     
        if(response.error){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.error,
          
          })
        } else{
      
        document.getElementById("id-sign-in-modal")!.style.display="none"
        
         
        }
     
    });

  }
 }

}
