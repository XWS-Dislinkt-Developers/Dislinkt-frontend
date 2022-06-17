import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.css']
})
export class ConfirmCodeComponent implements OnInit {
  token: any;
  id: any = "";
  ut: any = ""
  ur: any = ""
  un: any = ""

  constructor(private router: Router, private authService: AuthenticationServiceService) { }
  ngOnInit(): void {
    this.token = ""
  }

  checkCode(): void {
    this.id = localStorage.getItem('ID')
    this.ut = localStorage.getItem('UT')
    this.ur = localStorage.getItem('UR')
    this.un = localStorage.getItem('UN')
    this.authService.checkCode(this.token, this.id).subscribe(
      response => {
        if (response.verified == true){
          localStorage.setItem('userId',this.id);
          localStorage.setItem('userToken', this.ut);
          localStorage.setItem('userRole', this.ur);
          localStorage.setItem('username', this.un)
          localStorage.removeItem('ID')
          localStorage.removeItem('QR')
          localStorage.removeItem('UT')
          localStorage.removeItem('UR')
          localStorage.removeItem('UN')
          this.router.navigate(['/profile']) 
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Error: Invalid Code ',
            text: 'You code is invalid or expired. Please, try again.',
          })
        }
      }
    )
  }
}

