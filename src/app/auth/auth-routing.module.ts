import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';


const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  // {
  //   path: 'register', component: RegisterComponent
  // },
  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },
  {
    path: 'recover-password', component: RecoverPasswordComponent
  },
  {
    path: 'verify-account', component: VerifyAccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
