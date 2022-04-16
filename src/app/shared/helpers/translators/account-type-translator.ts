import { AccountType } from './../../constants/account-type';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class AccountTypeTranslator {
  constructor(readonly translateService: TranslateService) { }

  translate(accountType: AccountType): string {
    if (accountType === AccountType.CLIENT) {
      return this.translateService.instant('accountType.client');
    }
    return this.translateService.instant('accountType.creator');
  }
}