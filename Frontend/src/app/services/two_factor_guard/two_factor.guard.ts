import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service'

@Injectable({
  providedIn: 'root'
})
export class TwoFactorGuard implements CanActivate {

  constructor (private authService: AuthenticationServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/'])
      return false
    } else {
      return true
    }
  }
  
}
