import { AuthService } from './../shared/services/auth.service';
import { ToastMessageService } from './../shared/reusable-components/toast-message/toast-message.service';
import { ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { Injectable } from '@angular/core';
import { toastMessageType } from '../shared/constants/toastMessageType';

@Injectable({ providedIn: 'root' })
export class ThirdPartAuthGuard implements CanActivate {
  constructor(
    private readonly toastMessageService: ToastMessageService,
    private readonly authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
      if(route.queryParams && route.queryParams['access_token'] && route.queryParams['refresh_token'] && route.queryParams['accountType']) {
        const data = {
          access_token: route.queryParams['access_token'],
          refresh_token: route.queryParams['refresh_token'],
          accountType: route.queryParams['accountType']
        }
        this.authService.thirdPartLogin(data);
        return false;
      } else {
        this.authService.redirectToLoginPage();
        this.toastMessageService.setMessage('Authorization', 'Error at login via google, please contact with support', toastMessageType.ERROR, 5);
        return false;
      }
  }

}