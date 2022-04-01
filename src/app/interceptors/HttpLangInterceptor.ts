import { Injectable } from '@angular/core';
import { LangService } from './../shared/services/lang.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class HttpLangInterceptor implements HttpInterceptor {
  constructor(private langService: LangService) {} 
 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
  const lang = this.langService.getLang();
  request = request.clone({
    setHeaders: { 'x-custom-lang': lang }
  });
  return next.handle(request);
 }
}