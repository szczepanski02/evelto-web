import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Lang } from 'src/app/shared/constants/lang';
import { toastMessageType } from 'src/app/shared/constants/toastMessageType';
import { IAuthorizatedUser } from 'src/app/shared/interfaces/AuthorizatedUser';
import { ToastMessageService } from 'src/app/shared/reusable-components/toast-message/toast-message.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LangService } from 'src/app/shared/services/lang.service';

@Component({
  selector: 'app-topbar-non-auth-dropdown',
  templateUrl: './topbar-non-auth-dropdown.component.html',
  styleUrls: ['./topbar-non-auth-dropdown.component.scss'],
})
export class TopbarNonAuthDropdownComponent implements OnInit {
  langEnum: typeof Lang = Lang;

  settedLang?: string;

  constructor(
    private readonly langService: LangService,
    private readonly toastMessageService: ToastMessageService,
    private readonly translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.settedLang = String(this.langService.getLang());
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
