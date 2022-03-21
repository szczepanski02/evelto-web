import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './ng-material.module';
import { ToastMessageComponent } from './reusable-components/toast-message/toast-message.component';
import { ShowIfBetweenWidthDirective } from './directives/show-if-between-width.directive';



@NgModule({
  declarations: [
    ToastMessageComponent,
    ShowIfBetweenWidthDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    ToastMessageComponent,
    ShowIfBetweenWidthDirective,
  ]
})
export class SharedModule { }
