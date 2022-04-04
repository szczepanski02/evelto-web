import { LangService } from './shared/services/lang.service';
import { Lang } from './shared/constants/lang';
import { SidenavService } from './layout/sidenav/sidenav.service';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { WindowSizeService } from './shared/services/window-size.service';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthorizated = false;
  isLoadingSpinnerActive = false;

  isAuthorizatedSubscription?: Subscription;

  constructor(
    private readonly windowSizeService: WindowSizeService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly sidenavService: SidenavService,
    private translateService: TranslateService,
    private langService: LangService
  ) {
    this.translateService.addLangs([Lang.EN, Lang.PL]);
    this.translateService.setDefaultLang(Lang.EN);
  }

  ngOnInit(): void {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `calc(${vh}px)`);
    this.langService.getLang();
    this.langService.setTranslateServiceLang();
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.isLoadingSpinnerActive = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.isLoadingSpinnerActive = false;
          this.sidenavService.setActiveItem(this.router.url);
        }
      },
      () => {
        this.isLoadingSpinnerActive = false;
      }
    );

    this.isAuthorizatedSubscription = this.authService
      .getIsAuthorizated()
      .subscribe((state) => {
        this.isAuthorizated = state;
      });
  }

  ngOnDestroy(): void {
    this.isAuthorizatedSubscription?.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResized(event: any) {
    this.windowSizeService.resized({
      width: event.target.innerWidth,
      height: event.target.innerHeight,
    });
  }
}
