import { TranslateService } from '@ngx-translate/core';
import { Gender } from './../constants/gender';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "genderTranslate" })
export class GenderTranslatePipe implements PipeTransform {

  constructor(
    readonly translateService: TranslateService
  ) { }

  transform(gender?: string) {
    if (gender === Gender.MALE) {
      return this.translateService.instant('genders.male');
    }
    if (gender === Gender.FEMALE) {
      return this.translateService.instant('genders.female');
    }
    return this.translateService.instant('genders.other');
  }
}