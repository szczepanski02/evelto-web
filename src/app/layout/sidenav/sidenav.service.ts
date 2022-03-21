import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private activeItem: Subject<SidenavViews> = new BehaviorSubject<SidenavViews>(SidenavViews.HOME);

  constructor() { }

  getActiveItem(): Observable<SidenavViews> {
    return this.activeItem.asObservable();
  }

  setActiveItem(state: any): void {
    const sub = this.getActiveItem().subscribe(activeItem => {
      if(activeItem === state) return;
      else {
        this.activeItem.next(state);
      }
    });
    sub.unsubscribe();
  }

}

export enum SidenavViews {
  HOME = '/creator/home',
  STATS = '/creator/stats',
  ACCOUNT = '/creator/account'
}