import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BackendapiService } from './services/backendapi.service';

@Injectable({
  providedIn: 'root'
})
export class DevicesGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private api: BackendapiService
  ) {}

  isAllow(): Observable<boolean> {
    return this.api.isAllowTodevice().pipe(
      map(() => {
        // API success → allowed
        return true;
      }),
      catchError(() => {
        // API failed → not allowed
        this.router.navigate(['/Unauthorized']);
        return of(false);
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.isAllow();
  }

  canLoad(): Observable<boolean> {
    return this.isAllow();
  }
}
