import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { NonAuthGuard } from './guards/non-auth.guard';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'client',
    loadChildren: () => import('./pages/client/client.module').then(m => m.ClientModule),
  },
  {
    path: 'creator',
    loadChildren: () => import('./pages/creator/creator.module').then(m => m.CreatorModule),
  },
  {
    path: '',
    component: WelcomePageComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload" })],
  exports: [RouterModule],
  providers: [AuthGuard, NonAuthGuard]
})
export class AppRoutingModule { }
