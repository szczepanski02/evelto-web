import { ICreator } from './../interfaces/ICreator';
import { ISuccessResponse } from './../interfaces/SuccessResponse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Gender } from '../constants/gender';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly api = `${environment.apiUrl}/user`;

  constructor(private readonly http: HttpClient) { }

  getUserWithRelations(): Observable<ISuccessResponse<ICreator>> {
    return this.http.get<ISuccessResponse<ICreator>>(
      `${this.api}/getWithRelations`
    );
  }

  updateProfile(updateProfileDto: IUpdateUserProfile): Observable<ISuccessResponse<string>> {
    return this.http.put<ISuccessResponse<string>>(
      `${this.api}/update`,
      updateProfileDto
    );
  }
}

export interface IUpdateUserProfile {
  username: string;
  email: string;
  gender: Gender;
  birthDate?: Date;
  phoneNumber?: string;
  country?: string;
  city?: string;
  zipCode?: string;
  address1?: string;
  address2?: string;
  profileImg?: string;
}
