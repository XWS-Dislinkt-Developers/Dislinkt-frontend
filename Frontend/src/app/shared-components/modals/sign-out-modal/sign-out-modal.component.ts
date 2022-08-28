import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out-modal',
  templateUrl: './sign-out-modal.component.html',
  styleUrls: ['./sign-out-modal.component.css']
})
export class SignOutModalComponent implements OnInit {


  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  signOut(){
    localStorage.clear();
    // this.router.navigate(['/profile/'+ localStorage.getItem("userId")])
    // window.location.reload(); //OVDE RADI
    window.location.href = ""; 

  
  }
}
