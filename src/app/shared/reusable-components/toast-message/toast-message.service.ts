import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { toastMessageType } from '../../constants/toastMessageType';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  private message: Subject<IToastMessage> = new Subject<IToastMessage>();

  constructor() { }

  setMessage(title: string, content: string, type: toastMessageType, expirationTime: number): void {
    const toastMessage: IToastMessage = {
      title,
      content,
      type,
      expirationTime,
      expirationDate: Math.floor(new Date().getTime()/1000.0) + expirationTime,
    }
    this.message.next(toastMessage);
  }

  getMessages(): Observable<IToastMessage> {
    return this.message.asObservable();
  }

}

export interface IToastMessage {
  title: string;
  type: toastMessageType;
  expirationTime: number; // in seconds
  content: string;
  expirationDate: number;
}