import { SharedModule } from './../../../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileSessionsComponent } from './profile-sessions/profile-sessions.component';
import { ProfilePasswordComponent } from './profile-password/profile-password.component';
import { ProfileCompleterComponent } from './profile-completer/profile-completer.component';

@NgModule({
  declarations: [ProfileComponent, ProfileSessionsComponent, ProfilePasswordComponent, ProfileCompleterComponent],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }]),
  ],
})
export class ProfileModule {}
