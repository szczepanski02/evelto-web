import { Component, HostListener } from '@angular/core';
import { WindowSizeService } from './shared/services/window-size.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private readonly windowSizeService: WindowSizeService
  ) {}

  @HostListener('window:resize', ['$event'])
  onWindowResized(event: any) {
    this.windowSizeService.resized({ width: event.target.innerWidth, height: event.target.innerHeight });
  }
}
