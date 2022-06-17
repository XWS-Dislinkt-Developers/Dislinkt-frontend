import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {
  image: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.image = localStorage.getItem('QR')
  }

  redirect(): void {
          this.router.navigate(['/confirmCode']) 
       
  }
}
