import { ToastMessageService } from './../shared/reusable-components/toast-message/toast-message.service';
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { AuthService } from "../shared/services/auth.service";
import { JwtService } from "../shared/services/jwt.service";
import { toastMessageType } from '../shared/constants/toastMessageType';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly toastMessageService: ToastMessageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    const token = this.jwtService.getAccessToken();
    if(token) {
      request = this.addToken(request, token);
    } 

    return next.handle(request).pipe(catchError(error => {
      if(error instanceof HttpErrorResponse && request.url.indexOf('/refresh') !== -1) {
        this.authService.logout();
        this.authService.redirectToLoginPage();
        return next.handle(request);
      }
      if(error instanceof HttpErrorResponse && error.status === 401) {
        if(request.url.indexOf('/login') !== -1) { // for sing in error - blocking auto /refresh request
          this.toastMessageService.setMessage('Authorization', error.error.message, toastMessageType.ERROR, 5);
          return of(true);
        }
        if(error.error.message && error.error.message === 'Unauthorizated') {
          this.toastMessageService.setMessage('Authorization', error.error.message, toastMessageType.ERROR, 5);
          return of(true);
        }
        return this.handle401error(request, next);
      }
      return next.handle(request);
    })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401error(request: HttpRequest<any>, next: HttpHandler) {
    if(!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshSession().pipe(
        switchMap(response => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response.body.refresh_token);
          this.authService.setSession(response.body.access_token, response.body.refresh_token);
          this.authService.redirect(true);
          return next.handle(this.addToken(request, response.body.refresh_token));
        }), catchError(() => {
          this.authService.logout();
          this.authService.redirectToLoginPage();
          return next.handle(request);
        }),
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
      }));
    }
  }
  
}