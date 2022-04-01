import { TranslateService } from '@ngx-translate/core';
import { ToastMessageService } from './../shared/reusable-components/toast-message/toast-message.service';
import { CanActivate, Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { toastMessageType } from '../shared/constants/toastMessageType';

@Injectable({ providedIn: 'root' })
export class NonAuthGuard implements CanActivate {
  constructor(
    private readonly toastMessageService: ToastMessageService,
    private router: Router,
    private readonly translateService: TranslateService
  ) {}

  canActivate(): boolean {
    const accessToken = localStorage.getItem('access_token');
    if(accessToken) {
      if(this.router.url === '/') {
        this.router.navigate(['/creator/home']);
        return false;
      }
      this.router.navigate(['/creator/home']);
      this.toastMessageService.setMessage(
        this.translateService.instant('auth.notificationTitle'),
        this.translateService.instant('auth.alreadyLoggedIn'),
        toastMessageType.WARN,
        5
      );
      return false;
    }
    return true;
  }

}