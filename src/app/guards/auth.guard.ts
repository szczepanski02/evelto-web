import { IAuthorizatedUser } from './../shared/interfaces/AuthorizatedUser';
import { AuthService } from './../shared/services/auth.service';
import { CanActivate, Router } from "@angular/router";
import { catchError, map, Observable, of } from 'rxjs';
import { AccountType } from '../shared/constants/account-type';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.userHasAccess();
  }

  userDataSetup(user: IAuthorizatedUser): void {
    this.authService.setAuthorizatedUser(user);
  }

  userHasAccess(): Observable<boolean> {
    return this.authService.getUserFromToken().pipe(
      map(response => {
        this.redirectToLastRoute();
        if(response.body.accountType === AccountType.CREATOR) {
          this.userDataSetup(response.body);
          return true;
        }
        return false;
      }),
      catchError(() => {
        return of(false);
      })
    )
  }

  redirectToLastRoute(): void {
    const redirect = localStorage.getItem('redirectTo');
    if(redirect) {
      this.router.navigate([redirect]);
      localStorage.removeItem('redirectTo');
    }
  }

}