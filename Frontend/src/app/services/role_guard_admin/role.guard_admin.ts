import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service'

@Injectable({
  providedIn: 'root'
})
export class RoleGuardAdmin implements CanActivate {
  constructor (private authService: AuthenticationService, private router: Router) {}

  canActivate() {
    if (this.authService.adminAccess()) {
      return true
    }
    else {
      this.router.navigate(['/settings-and-privacy'])
      return false
    }
  } 
    
  
}
