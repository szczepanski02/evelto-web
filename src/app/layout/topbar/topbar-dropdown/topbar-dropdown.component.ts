import { TranslateService } from '@ngx-translate/core';
import { ToastMessageService } from './../../../shared/reusable-components/toast-message/toast-message.service';
import { Lang } from './../../../shared/constants/lang';
import { LangService } from './../../../shared/services/lang.service';
import { IAuthorizatedUser } from './../../../shared/interfaces/AuthorizatedUser';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { toastMessageType } from 'src/app/shared/constants/toastMessageType';

@Component({
  selector: 'app-topbar-dropdown',
  templateUrl: './topbar-dropdown.component.html',
  styleUrls: ['./topbar-dropdown.component.scss'],
})
export class TopbarDropdownComponent implements OnInit, OnDestroy {
  langEnum: typeof Lang = Lang;

  user?: IAuthorizatedUser;
  userSub?: Subscription;
  settedLang?: string;

  constructor(
    private readonly authService: AuthService,
    readonly langService: LangService,
    private readonly toastMessageService: ToastMessageService,
    readonly translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.settedLang = String(this.langService.getLang());
    this.userSub = this.authService.getUserFromToken().subscribe((response) => {
      this.user = response.body;
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  handleLogout(): void {
    this.authService.logout();
  }

  switchLang(lang: Lang) {
    if (lang === this.settedLang) {
      return;
    }
    this.settedLang = String(lang);
    this.langService.setLang(lang);
    this.toastMessageService.setMessage(
      this.translateService.instant('lang.notificationTitle'),
      this.translateService.instant('lang.changed', { lang }),
      toastMessageType.INFO,
      5
    );
    setTimeout(() => {
      location.reload();
    }, 5000);
  }
}
