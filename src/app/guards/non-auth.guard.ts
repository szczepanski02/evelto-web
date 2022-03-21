import { ToastMessageService } from './../shared/reusable-components/toast-message/toast-message.service';
import { CanActivate, Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { toastMessageType } from '../shared/constants/toastMessageType';

@Injectable({ providedIn: 'root' })
export class NonAuthGuard implements CanActivate {
  constructor(
    private readonly toastMessageService: ToastMessageService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const accessToken = localStorage.getItem('access_token');
    if(accessToken) {
      if(this.router.url === '/') {
        this.router.navigate(['/creator/home']);
        return false;
      }
      this.router.navigate(['/creator/home']);
      this.toastMessageService.setMessage('Authorization', 'You are already logged in', toastMessageType.WARN, 5);
      return false;
    }
    return true;
  }

}