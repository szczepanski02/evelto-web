import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  readonly _accessTokenLs = 'access_token';
  readonly _refreshTokenLs = 'refresh_token';

  getAccessToken(): string | null {
    if (localStorage.getItem(this._accessTokenLs)) {
      return localStorage.getItem(this._accessTokenLs);
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (localStorage.getItem(this._refreshTokenLs)) {
      return localStorage.getItem(this._refreshTokenLs);
    }
    return null;
  }

  setAccessToken(access_token: string | null): void {
    if (access_token) {
      localStorage.setItem(this._accessTokenLs, access_token);
    } else {
      localStorage.removeItem(this._accessTokenLs);
    }
  }

  setRefreshToken(refresh_token: string | null): void {
    if (refresh_token) {
      localStorage.setItem(this._refreshTokenLs, refresh_token);
    } else {
      localStorage.removeItem(this._refreshTokenLs);
    }
  }
}
