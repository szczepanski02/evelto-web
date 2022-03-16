import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class WindowSizeService {
  private subject = new BehaviorSubject<IScreenSizeParams>({width:window.innerWidth, height:window.innerHeight});

  public resized(sizeParams: IScreenSizeParams): void {
    this.subject.next(sizeParams);
  }

  getSize(): Observable<IScreenSizeParams> {
    return this.subject.asObservable();
  }

}

interface IScreenSizeParams {
  width: number;
  height: number;
}