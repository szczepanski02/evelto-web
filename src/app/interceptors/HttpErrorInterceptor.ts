import { TranslateService } from '@ngx-translate/core';
import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { toastMessageType } from '../shared/constants/toastMessageType';
import { ToastMessageService } from '../shared/reusable-components/toast-message/toast-message.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly toastMessageService: ToastMessageService,
    private readonly translateService: TranslateService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return next.handle(req).pipe();
        }
        if (err.status === 403) {
          if (err.error.message) {
            this.toastMessageService.setMessage(
              this.translateService.instant('auth.notificationTitle'),
              err.error.message,
              toastMessageType.ERROR,
              5
            );
            return of(true);
          }
          this.toastMessageService.setMessage(
            this.translateService.instant('auth.notificationTitle'),
            this.translateService.instant('auth.noAuthorized'),
            toastMessageType.ERROR,
            5
          );
          return of(true);
        }
        if (err.error.message && err.status !== 403 && err.status !== 401) {
          console.log(err.error);
          if (err.error.message.message) {
            this.toastMessageService.setMessage(
              'Error',
              'Invalid request, please raport it to administrator',
              toastMessageType.ERROR,
              5
            );
          }
          this.toastMessageService.setMessage(
            'Error',
            err.error.message,
            toastMessageType.ERROR,
            5
          );
        }
        return of(false);
      })
    );
  }
}
