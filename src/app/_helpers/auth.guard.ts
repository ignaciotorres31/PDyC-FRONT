import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor (
        private router: Router,
        private authService: AuthenticationService 
    ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

    
        if (localStorage.getItem('token')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
  }
  
}