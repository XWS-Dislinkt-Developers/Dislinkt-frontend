import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private authService: AuthenticationServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true
    } else {
      this.router.navigate(['/'])
      return false
    }
  }
  
}
