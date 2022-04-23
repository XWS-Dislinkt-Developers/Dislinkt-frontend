import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-top-right-vertical-navbar',
  templateUrl: './top-right-vertical-navbar.component.html',
  styleUrls: ['./top-right-vertical-navbar.component.css']
})
export class TopRightVerticalNavbarComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {

  }


  // Modals
  signInModal() { this.document.getElementById('id-sign-in-modal')!.style.display = 'block';}
  registerModal() { this.document.getElementById('id-registration-modal')!.style.display = 'block';}
  signOutModal() { this.document.getElementById('id-sign-out-modal')!.style.display = 'block';}

}
