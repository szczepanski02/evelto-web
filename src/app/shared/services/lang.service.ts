import { TranslateService } from '@ngx-translate/core';
import { ISuccessResponse } from './../interfaces/SuccessResponse';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Lang } from '../constants/lang';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  CLIENT_LANG_LC = 'client_lang'
  private api = `${environment.apiUrl}/user/lang`;
  currentLang: Lang = Lang.EN;

  constructor(
    private http: HttpClient,
    private readonly authService: AuthService,
    private translateService: TranslateService
  ) { }

  setLang(lang: Lang): void {
    const user = this.authService.getAuthorizatedUser();
    localStorage.setItem(this.CLIENT_LANG_LC, lang);
    this.currentLang = lang;
    if(user) {
      this.http.put<ISuccessResponse<string>>(`${this.api}/${user.id}`, { lang }).subscribe();
    }
    this.setTranslateServiceLang();
  }

  getLang(): Lang {
    const lang = localStorage.getItem(this.CLIENT_LANG_LC);
    const user = this.authService.getAuthorizatedUser();
    if(lang) {
      if(lang === Lang.EN) {
        this.currentLang = Lang.EN;
        return Lang.EN;

      }
      if(lang === Lang.PL) {
        this.currentLang = Lang.PL;
        return Lang.PL;
      }
    }
    // if lang is not exist in local storage we will get it from token
    if(!user) {
      this.setLang(Lang.EN);
      this.currentLang = Lang.EN;
      return Lang.EN;
    }
    this.setLang(user.lang);
    this.currentLang = user.lang;
    return user.lang;
  }

  setTranslateServiceLang(): void {
    const lang = localStorage.getItem(this.CLIENT_LANG_LC);
    if(!lang) {
      this.getLang();
      return;
    }
    this.translateService.use(lang);
  }

}
