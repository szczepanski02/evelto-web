import { ICreator } from './../interfaces/ICreator';
import { ISuccessResponse } from './../interfaces/SuccessResponse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly api = `${environment.apiUrl}/user`;

  constructor(
    private readonly authService: AuthService,
    private readonly http: HttpClient
  ) {}

  getUserWithRelations(): Observable<ISuccessResponse<ICreator>> {
    const clientId = this.authService.getAuthorizatedUser()?.id;
    return this.http.get<ISuccessResponse<ICreator>>(
      `${this.api}/getWithRelations/${clientId}`
    );
  }
}
