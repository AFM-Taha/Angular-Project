import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { OtpComponent } from './auth/otp/otp.component';
import { SetPasswordComponent } from './auth/set-password/set-password.component';
import { AuthGuardService } from './_services/core/auth-guard.service';
import { CanDeactivateGuard } from './_services/core/can-deactivate-guard.service';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'set-password/:id',
    component: SetPasswordComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'otp',
    component: OtpComponent,
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./administrator/administrator.module').then(
        (mod) => mod.AdministratorModule
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ 
    CanDeactivateGuard
  ]
})
export class AppRoutingModule { }
