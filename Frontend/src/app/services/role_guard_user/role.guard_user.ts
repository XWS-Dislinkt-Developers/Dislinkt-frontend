import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthenticationService } from '../authentication.service'

@Injectable({
  providedIn: 'root'
})
export class RoleGuardUser implements CanActivate {
  constructor (private authService: AuthenticationService, private router: Router) {}

  canActivate() {
    if (this.authService.userAccess()) {
      return true
    }
    else {
      this.router.navigate(['/'])
      return false
    }
  } 
    
  
}
