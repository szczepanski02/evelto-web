import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { ReusableComponentsModule } from './reusable-components/reusable-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './ng-material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReusableComponentsModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    MaterialModule,
    ReusableComponentsModule,
    DirectivesModule,
    PipesModule
  ],
})
export class SharedModule { }
