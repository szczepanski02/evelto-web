import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NonAuthGuard } from 'src/app/guards/non-auth.guard';
import { ThirdPartAuthGuard } from 'src/app/guards/third-part-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login' },
  { path: 'login', component: LoginPageComponent, canActivate: [NonAuthGuard] },

  { path: 'third-part-auth/redirect', canActivate: [ThirdPartAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [ThirdPartAuthGuard],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
