import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out-modal',
  templateUrl: './sign-out-modal.component.html',
  styleUrls: ['./sign-out-modal.component.css']
})
export class SignOutModalComponent implements OnInit {
show: boolean=false;

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  signOut(){
    localStorage.clear();
    this.router.navigate([''])
  }
}
