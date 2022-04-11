import { ReusableComponentsModule } from './reusable-components/reusable-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './ng-material.module';
import { ShowIfBetweenWidthDirective } from './directives/show-if-between-width.directive';

@NgModule({
  declarations: [ShowIfBetweenWidthDirective],
  imports: [CommonModule, MaterialModule, ReusableComponentsModule],
  exports: [
    MaterialModule,
    ReusableComponentsModule,
    ShowIfBetweenWidthDirective,
  ],
})
export class SharedModule {}
