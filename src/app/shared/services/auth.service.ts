import { BehaviorSubject } from 'rxjs';
import { ISuccessResponse } from './../interfaces/SuccessResponse';
import { Observable, Subject } from 'rxjs';
import { IAuthorizatedUser } from './../interfaces/AuthorizatedUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = `${environment.apiUrl}/auth`;

  private authorizatedUser?: IAuthorizatedUser;
  private isAuthorizated: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly http: HttpClient,
  ) { }

  login(payload: ILoginPayload): Observable<ISuccessResponse<string>> {
    return this.http.post<ISuccessResponse<string>>(`${this.api}/login`, payload);
  }

  getUserFromToken(): Observable<ISuccessResponse<IAuthorizatedUser>> {
    return this.http.get<ISuccessResponse<IAuthorizatedUser>>(`${this.api}/authorize`);
  }

  logout(): Observable<ISuccessResponse<string>> {
    return this.http.get<ISuccessResponse<string>>(`${this.api}/logout`);
  }
  
  // getters and setters
  getIsAuthorizated(): Observable<boolean> {
    return this.isAuthorizated.asObservable();
  }

  setIsAuthorizated(state: boolean): void {
    const sub = this.getIsAuthorizated().subscribe(accState => {
      if(accState === state) return;
      else {
        this.isAuthorizated.next(state);
      }
    });
  }

  getAuthorizatedUser(): IAuthorizatedUser | null {
    if(this.authorizatedUser) {
      return this.authorizatedUser;
    }
    return null;
  }

  setAuthorizatedUser(data: IAuthorizatedUser): void {
    this.authorizatedUser = data;
  }

}

export interface ILoginPayload {
  email: string;
  password: string;
}