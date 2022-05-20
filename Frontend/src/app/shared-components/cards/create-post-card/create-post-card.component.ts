import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post-card',
  templateUrl: './create-post-card.component.html',
  styleUrls: ['./create-post-card.component.css']
})
export class CreatePostCardComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) {}
  
  ngOnInit(): void {
  }

    // Modals
    createPostModal()  { this.document.getElementById('id-create-post-modal')!.style.display = 'block';}

}
