import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate,CanLoad {
  constructor(private router:Router){}
  isLoggedIn()
  {
   return !!localStorage.getItem('token');
  }
  canActivate():boolean
  {
    if(this.isLoggedIn())return true;
     this.router.navigate(['/']);
     return false
  }
  canLoad():boolean
  {
    if(this.isLoggedIn())return true;
    this.router.navigate(['/']);
    return false
  }

}
