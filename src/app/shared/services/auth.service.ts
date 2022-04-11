import { Lang } from './../constants/lang';
import { Gender } from './../constants/gender';
import { TranslateService } from '@ngx-translate/core';
import { ToastMessageService } from './../reusable-components/toast-message/toast-message.service';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ISuccessResponse } from './../interfaces/SuccessResponse';
import { Observable, Subject } from 'rxjs';
import { IAuthorizatedUser } from './../interfaces/AuthorizatedUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { toastMessageType } from '../constants/toastMessageType';
import { AccountType } from '../constants/account-type';
import { CountriesEnum } from '../constants/countries';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly api = `${environment.apiUrl}/auth`;

  private authorizatedUser?: IAuthorizatedUser;
  private isAuthorizated: Subject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  readonly _redirectLs = 'redirect_to';

  constructor(
    private readonly http: HttpClient,
    readonly jwtService: JwtService,
    readonly toastMessageService: ToastMessageService,
    readonly translateService: TranslateService,
    readonly router: Router
  ) {}

  login(payload: ILoginPayload): void {
    this.http
      .post<ISuccessResponse<ITokens>>(`${this.api}/login`, payload)
      .subscribe((response) => {
        this.loginSuccessHandler(response.body);
      });
  }

  register(payload: IRegisterPayload): void {
    this.http
      .post<ISuccessResponse<string>>(`${this.api}/register`, payload)
      .subscribe((response) => {
        this.toastMessageService.setMessage(
          this.translateService.instant('auth.notificationTitle'),
          response.body,
          toastMessageType.INFO,
          5
        );
        this.router.navigate(['/auth/login']);
      });
  }

  loginSuccessHandler(data: ITokens) {
    if (data.accountType !== AccountType.CREATOR) {
      this.toastMessageService.setMessage(
        this.translateService.instant('auth.notificationTitle'),
        this.translateService.instant('auth.notCreator'),
        toastMessageType.ERROR,
        5
      );
      if (this.router.url !== '/auth/login') {
        this.router.navigate(['/auth/login']);
      }
      return;
    }
    this.setSession(data.access_token, data.refresh_token);
    this.toastMessageService.setMessage(
      this.translateService.instant('auth.notificationTitle'),
      this.translateService.instant('auth.signSuccess'),
      toastMessageType.INFO,
      5
    );
    this.redirect(true);
  }

  thirdPartLogin(data: ITokens): void {
    this.loginSuccessHandler(data);
  }

  getUserFromToken(): Observable<ISuccessResponse<IAuthorizatedUser>> {
    return this.http.get<ISuccessResponse<IAuthorizatedUser>>(
      `${this.api}/authorize`
    );
  }

  logout(): Observable<ISuccessResponse<string>> | void {
    const refresh_token = this.jwtService.getRefreshToken();
    this.jwtService.setAccessToken(null);
    this.jwtService.setRefreshToken(null);
    this.router.navigate(['/auth/login']);
    this.setIsAuthorizated(false);
    if (refresh_token) {
      this.http
        .post<ISuccessResponse<string>>(`${this.api}/logout`, { refresh_token })
        .subscribe()
        .unsubscribe();
    }
  }

  isCreator(): boolean {
    if (
      this.authorizatedUser &&
      this.authorizatedUser.accountType === AccountType.CREATOR
    ) {
      return true;
    }
    return false;
  }

  setSession(accessToken: string, refreshToken: string): void {
    this.setIsAuthorizated(true);
    this.jwtService.setAccessToken(accessToken);
    this.jwtService.setRefreshToken(refreshToken);
  }

  refreshSession(): Observable<ISuccessResponse<ITokens>> {
    const refresh_token = this.jwtService.getRefreshToken();
    return this.http.post<ISuccessResponse<ITokens>>(`${this.api}/refresh`, {
      refresh_token,
    });
  }

  redirectToLoginPage(): void {
    this.router.navigate(['/auth/login']);
    this.toastMessageService.setMessage(
      this.translateService.instant('auth.notificationTitle'),
      this.translateService.instant('auth.signInToContinue'),
      toastMessageType.ERROR,
      5
    );
  }

  redirect(includeLSItem: boolean): void {
    const redirectUrl = localStorage.getItem(this._redirectLs);
    if (redirectUrl && includeLSItem) {
      this.router.navigate([`${redirectUrl}`]);
      this.deleteRedirectUrl();
    } else {
      this.router.navigate(['/creator/home']);
    }
  }

  setRedirectUrl(currentUrl: string): void {
    localStorage.setItem(this._redirectLs, currentUrl);
  }

  getRedirectUrl(): string | null {
    return localStorage.getItem(this._redirectLs);
  }

  deleteRedirectUrl(): void {
    localStorage.removeItem(this._redirectLs);
  }

  // getters and setters
  getIsAuthorizated(): Observable<boolean> {
    return this.isAuthorizated.asObservable();
  }

  setIsAuthorizated(state: boolean): void {
    this.isAuthorizated.next(state);
  }

  getAuthorizatedUser(): IAuthorizatedUser | null {
    if (this.authorizatedUser) {
      return this.authorizatedUser;
    }
    return null;
  }

  setAuthorizatedUser(data: IAuthorizatedUser): void {
    this.authorizatedUser = data;
  }
}

export interface ITokens {
  access_token: string;
  refresh_token: string;
  accountType: AccountType;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  accountType: AccountType;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  profileImg: string;
  birthDate: Date;
  gender: Gender;
  country: CountriesEnum;
  city: string;
  zipCode: string;
  address1: string;
  lang: Lang;
}
