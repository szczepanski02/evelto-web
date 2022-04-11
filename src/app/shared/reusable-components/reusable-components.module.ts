import { PieChartComponent } from './pie-chart/pie-chart.component';
import { MaterialModule } from './../ng-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastMessageComponent } from './toast-message/toast-message.component';
import { NgChartsModule } from 'ng2-charts';
import { ProfilePreviewerComponent } from './profile-previewer/profile-previewer.component';

@NgModule({
  declarations: [
    ToastMessageComponent,
    PieChartComponent,
    ProfilePreviewerComponent,
  ],
  imports: [CommonModule, MaterialModule, NgChartsModule],
  exports: [
    ToastMessageComponent,
    PieChartComponent,
    ProfilePreviewerComponent,
  ],
})
export class ReusableComponentsModule {}
