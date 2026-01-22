import { Injectable } from '@angular/core';
import {  CanActivate, Router} from '@angular/router';

import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(): boolean {

    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const decode: any = jwtDecode(token);

    if (decode.type === 'admin') {
      return true;   // ✅ allow admin
    }

    // Not admin → redirect
    this.router.navigate(['/Unauthorized']);
    return false;
  }
 
}
