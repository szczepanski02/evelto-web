import { SharedModule } from './../shared/shared.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';


@NgModule({
  declarations: [
    FooterComponent,
    SidenavComponent,
    TopbarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    SidenavComponent,
    TopbarComponent
  ]
})
export class LayoutModule { }
