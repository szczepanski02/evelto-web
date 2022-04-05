import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './../shared/shared.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { TopbarDropdownComponent } from './topbar/topbar-dropdown/topbar-dropdown.component';
import { TopbarNonAuthComponent } from './topbar-non-auth/topbar-non-auth.component';
import { TopbarNonAuthDropdownComponent } from './topbar-non-auth/topbar-non-auth-dropdown/topbar-non-auth-dropdown.component';

@NgModule({
  declarations: [
    FooterComponent,
    SidenavComponent,
    TopbarComponent,
    TopbarDropdownComponent,
    TopbarNonAuthComponent,
    TopbarNonAuthDropdownComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule, TranslateModule],
  exports: [
    FooterComponent,
    SidenavComponent,
    TopbarComponent,
    TopbarNonAuthComponent,
  ],
})
export class LayoutModule {}
