import { Gender } from './../../constants/gender';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class GenderTranslator {
  constructor(readonly translateService: TranslateService) { }

  translate(gender: Gender): string {
    if (gender === Gender.MALE) {
      return this.translateService.instant('genders.male');
    }
    if (gender === Gender.FEMALE) {
      return this.translateService.instant('genders.female');
    }
    return this.translateService.instant('genders.other');
  }
}