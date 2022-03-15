import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = `${environment.apiUrl}/auth`;

  constructor(
    private readonly http: HttpClient,
  ) { }

}
