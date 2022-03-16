import { AuthService } from './../shared/services/auth.service';
import { CanActivate, Router } from "@angular/router";
import { catchError, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NonAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.userHasAccess();
  }

  userHasAccess(): Observable<boolean> {
    return this.authService.getUserFromToken().pipe(
      map(response => {
        this.router.navigate(['/']);
        return false;
      }),
      catchError(() => {
        console.log(this.router.url);
        if(this.router.url !== '/auth/login') {
          this.router.navigate(['/auth/login']);
          return of(true);
        }
        this.router.navigate(['/auth/login']);
        return of(false);
      })
    )
  }

}