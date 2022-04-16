import { HideIfCreatedByDirective } from './hide-if-created-by.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowIfBetweenWidthDirective } from './show-if-between-width.directive';



@NgModule({
  declarations: [
    ShowIfBetweenWidthDirective,
    HideIfCreatedByDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShowIfBetweenWidthDirective,
    HideIfCreatedByDirective
  ]
})
export class DirectivesModule { }
