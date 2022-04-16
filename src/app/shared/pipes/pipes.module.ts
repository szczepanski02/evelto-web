import { AccountTypeTranslate } from './account-type-translate.pipe';
import { GenderTranslatePipe } from './gender-translate.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    GenderTranslatePipe,
    AccountTypeTranslate
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GenderTranslatePipe,
    AccountTypeTranslate
  ]
})
export class PipesModule { }
