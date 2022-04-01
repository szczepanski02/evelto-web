import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { ThirdPartAuthRedirectComponent } from './third-part-auth-redirect/third-part-auth-redirect.component';
import { RegisterPageComponent } from './register-page/register-page.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    ThirdPartAuthRedirectComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
