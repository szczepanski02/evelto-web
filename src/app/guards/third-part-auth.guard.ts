import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './../shared/services/auth.service';
import { ToastMessageService } from './../shared/reusable-components/toast-message/toast-message.service';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { toastMessageType } from '../shared/constants/toastMessageType';

@Injectable({ providedIn: 'root' })
export class ThirdPartAuthGuard implements CanActivate {
  constructor(
    private readonly toastMessageService: ToastMessageService,
    private readonly authService: AuthService,
    private readonly translateService: TranslateService,
    private readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (
      route.queryParams &&
      route.queryParams['access_token'] &&
      route.queryParams['refresh_token'] &&
      route.queryParams['accountType']
    ) {
      const data = {
        access_token: route.queryParams['access_token'],
        refresh_token: route.queryParams['refresh_token'],
        accountType: route.queryParams['accountType'],
      };
      this.authService.thirdPartLogin(data);
      return false;
    } else {
      if (route.queryParams && route.queryParams['error']) {
        if (route.queryParams['error'] === 'email') {
          this.toastMessageService.setMessage(
            this.translateService.instant('auth.notificationTitle'),
            this.translateService.instant(
              'This email is already in use by other strategy'
            ),
            toastMessageType.ERROR,
            5
          );
          this.router.navigate(['auth/login']);
          return false;
        }
        if (route.queryParams['error'] === 'signin') {
          this.toastMessageService.setMessage(
            this.translateService.instant('auth.notificationTitle'),
            this.translateService.instant('auth.signInViaGoogleError'),
            toastMessageType.ERROR,
            5
          );
          this.router.navigate(['auth/login']);
          return false;
        }
      }
      this.authService.redirectToLoginPage();
      this.toastMessageService.setMessage(
        this.translateService.instant('auth.notificationTitle'),
        this.translateService.instant('auth.signInViaGoogleError'),
        toastMessageType.ERROR,
        5
      );
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
