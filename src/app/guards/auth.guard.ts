import { ToastMessageService } from './../shared/reusable-components/toast-message/toast-message.service';
import { IAuthorizatedUser } from './../shared/interfaces/AuthorizatedUser';
import { AuthService } from './../shared/services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { map, Observable } from 'rxjs';
import { AccountType } from '../shared/constants/account-type';
import { Injectable } from '@angular/core';
import { toastMessageType } from '../shared/constants/toastMessageType';
import { ClientIsActive } from '../shared/constants/client-is-active';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly toastMessageService: ToastMessageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userHasAccess(state.url, state);
  }

  userDataSetup(user: IAuthorizatedUser): void {
    this.authService.setIsAuthorizated(true);
    this.authService.setAuthorizatedUser(user);
  }

  userHasAccess(redirectUrl: string, state: RouterStateSnapshot): Observable<boolean> {
    this.authService.setRedirectUrl(redirectUrl);
    return this.authService.getUserFromToken().pipe(
      map(response => {
        if(response.body) {
          if(!this.handleActiveCheckClientAccount(response.body, state)) {
            return false;
          }
          this.userDataSetup(response.body);
        }
        const accountType = response.body.accountType;
        if(accountType === AccountType.CREATOR) {
          this.authService.deleteRedirectUrl();
          return true;
        } else {
          this.toastMessageService.setMessage(
            'Authentication',
            'Sorry, you are not allowed to go there',
            toastMessageType.ERROR,
            5
          );
          this.authService.redirectToLoginPage();
        }
        return false;
      })
    )
  }

  handleActiveCheckClientAccount(user: IAuthorizatedUser, state: RouterStateSnapshot): boolean {
    if(user.isActive === ClientIsActive.IS_ACTIVE) {
      return true;
    }
    if(user.isActive === ClientIsActive.PROFILE_NOT_COMPLETE) {
      if(state.url === RedirectIfNotActiveEnum.PROFILE_NOT_COMPLETE) {
        return true;
      }
      this.toastMessageService.setMessage(
        'Authorization',
        'Please complete your profile to continue',
        toastMessageType.WARN,
        10
      );
      this.router.navigate([RedirectIfNotActiveEnum.PROFILE_NOT_COMPLETE]);
      return false;
    }
    this.toastMessageService.setMessage(
      'Authorization',
      'Some problem with your account, please contact with support',
      toastMessageType.ERROR,
      5
    );
    return false;
  }

}

enum RedirectIfNotActiveEnum {
  PROFILE_NOT_COMPLETE = '/creator/profile',
  BLOCKED = '/creator/account-blocked'
}