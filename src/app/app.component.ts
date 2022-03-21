import { SidenavService } from './layout/sidenav/sidenav.service';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { WindowSizeService } from './shared/services/window-size.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  
  isAuthorizated = false;
  isLoadingSpinnerActive = false;

  isAuthorizatedSubscription?: Subscription;

  constructor(
    private readonly windowSizeService: WindowSizeService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly sidenavService: SidenavService
  ) {}
  
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoadingSpinnerActive = true;

      } else if ( event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.isLoadingSpinnerActive = false;
        this.sidenavService.setActiveItem(this.router.url);
      }
      }, () => {
        this.isLoadingSpinnerActive = false;
    });

    this.isAuthorizatedSubscription = this.authService.getIsAuthorizated().subscribe(state => {
      this.isAuthorizated = state;
    });
  }

  ngOnDestroy(): void {
    this.isAuthorizatedSubscription?.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResized(event: any) {
    this.windowSizeService.resized({ width: event.target.innerWidth, height: event.target.innerHeight });
  }
}
