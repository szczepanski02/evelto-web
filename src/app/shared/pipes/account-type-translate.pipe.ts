import { TranslateService } from '@ngx-translate/core';
import { Pipe, PipeTransform } from "@angular/core";
import { AccountType } from '../constants/account-type';

@Pipe({ name: "accountTypeTranslate" })
export class AccountTypeTranslate implements PipeTransform {

  constructor(
    readonly translateService: TranslateService
  ) { }

  transform(accountType?: string) {
    if (accountType === AccountType.CLIENT) {
      return this.translateService.instant('accountType.client');
    }
    return this.translateService.instant('accountType.creator');
  }
}